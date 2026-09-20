import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Plan, initialInput, calculate, makePlan } from "../domain/plan";
const KEY = "theo.guest.v1";
type Data = { schema: 1; draft: Input; plans: Plan[]; introSeen: boolean };
type Store = Data & {
  ready: boolean;
  error: string;
  update: (input: Input) => void;
  accept: () => Promise<void>;
  reset: () => Promise<void>;
  dismissIntro: () => void;
};
const initial = (): Data => ({
  schema: 1,
  draft: { ...initialInput, training: [] },
  plans: [],
  introSeen: false,
});
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Data>(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const queue = useRef(Promise.resolve());
  const current = useRef(data);
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!mounted) return;
        if (raw) {
          const saved = JSON.parse(raw) as Data;
          if (saved.schema !== 1 || !Array.isArray(saved.plans) || !saved.draft)
            throw new Error("Unbekanntes Speicherformat");
          saved.plans.forEach((p) => calculate(p.input));
          setData(saved);
          current.current = saved;
        }
        setReady(true);
      })
      .catch(() => {
        if (mounted) {
          setError(
            "Lokale Daten konnten nicht geladen werden. Sie wurden nicht überschrieben. Bitte zurücksetzen, um neu zu beginnen.",
          );
        }
      });
    return () => {
      mounted = false;
    };
  }, []);
  const persist = (next: Data) => {
    current.current = next;
    setData(next);
    queue.current = queue.current
      .catch(() => {})
      .then(() => AsyncStorage.setItem(KEY, JSON.stringify(next)));
    return queue.current.catch((e) => {
      setError(
        "Speichern fehlgeschlagen. Deine Eingaben bleiben in dieser Sitzung erhalten.",
      );
      throw e;
    });
  };
  const update = (draft: Input) => {
    void persist({ ...current.current, draft }).catch(() => {});
  };
  const accept = async () => {
    const plan = makePlan(current.current.draft);
    await queue.current.catch(() => {});
    const next = {
      ...current.current,
      plans: [...current.current.plans, plan],
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    current.current = next;
    setData(next);
    setError("");
  };
  const reset = async () => {
    await queue.current.catch(() => {});
    await AsyncStorage.removeItem(KEY);
    const fresh = initial();
    current.current = fresh;
    setData(fresh);
    setReady(true);
    setError("");
  };
  return (
    <Context.Provider
      value={{
        ...data,
        ready,
        error,
        update,
        accept,
        reset,
        dismissIntro: () => {
          void persist({ ...current.current, introSeen: true }).catch(() => {});
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const value = useContext(Context);
  if (!value) throw new Error("Missing StoreProvider");
  return value;
}
