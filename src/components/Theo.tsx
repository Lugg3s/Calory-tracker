import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Pressable,
  Text,
  View,
} from "react-native";
import { colors, styles } from "./ui";
import { Sex } from "../domain/plan";
/** Code-native interim mascot. Hair is scoped by the caller to the category screen. */
export function Theo({
  height = 170,
  hair,
  help,
  intro = false,
  onIntroSeen,
}: {
  height?: number;
  hair?: Sex;
  help: string;
  intro?: boolean;
  onIntroSeen?: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [reduce, setReduce] = useState(true);
  const [open, setOpen] = useState(intro);
  useEffect(() => {
    let live = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (live) setReduce(v);
    });
    const sub = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduce,
    );
    const app = AppState.addEventListener("change", (s) => {
      if (s !== "active") scale.stopAnimation();
    });
    return () => {
      live = false;
      sub.remove();
      app.remove();
      scale.stopAnimation();
    };
  }, [scale]);
  useEffect(() => {
    scale.stopAnimation();
    const target = Math.max(0.78, Math.min(1.18, height / 170));
    if (reduce) scale.setValue(target);
    else
      Animated.timing(scale, {
        toValue: target,
        duration: 260,
        useNativeDriver: true,
      }).start();
    return () => scale.stopAnimation();
  }, [height, reduce, scale]);
  return (
    <View style={{ gap: 14 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Theo: Erklärung anzeigen"
        onPress={() => {
          setOpen(!open);
          onIntroSeen?.();
        }}
        style={{
          alignSelf: "flex-end",
          width: 90,
          height: 115,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: Animated.multiply(Animated.subtract(1, scale), 45),
              },
              { scale },
            ],
            width: 68,
            height: 90,
            borderRadius: 20,
            backgroundColor: colors.peach,
            padding: 10,
            gap: 8,
          }}
        >
          {hair && (
            <View
              style={{
                position: "absolute",
                top: -7,
                left: hair === "male" ? 4 : -3,
                width: hair === "male" ? 60 : 74,
                height: hair === "male" ? 20 : 38,
                backgroundColor: "#79604D",
                borderRadius: 15,
              }}
            />
          )}
          <View
            style={{
              height: 32,
              backgroundColor: "#403D43",
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Text style={{ color: colors.peach, fontSize: 18 }}>• ◡ •</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <View
                key={i}
                style={{
                  width: 12,
                  height: 10,
                  borderRadius: 4,
                  backgroundColor: i === 5 ? "#A67360" : "#D99D7F",
                }}
              />
            ))}
          </View>
        </Animated.View>
      </Pressable>
      {open && (
        <View
          style={[styles.card, { borderWidth: 1, borderColor: colors.line }]}
        >
          <Text style={styles.body}>
            {intro
              ? "Tippe auf mich – ich erkläre dir diese Eingabe und wie sie deinen Plan beeinflusst."
              : help}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setOpen(false);
              onIntroSeen?.();
            }}
          >
            <Text style={{ color: colors.peach }}>Verstanden</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
