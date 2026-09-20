import { router } from "expo-router";
import { View } from "react-native";
import { Button, styles } from "./ui";
export function Navigation({ active }: { active: "today" | "profile" }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Button
          title="Heute"
          secondary={active !== "today"}
          onPress={() => router.replace("/today")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title="Profil"
          secondary={active !== "profile"}
          onPress={() => router.replace("/profile")}
        />
      </View>
    </View>
  );
}
