import React, { PropsWithChildren } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
export const colors = {
  background: "#19171E",
  card: "#26232C",
  peach: "#F2BA9C",
  text: "#F6F0EA",
  muted: "#B9B0C2",
  line: "#443D4B",
  danger: "#FFC7AB",
};
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: {
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
    padding: 24,
    paddingTop: 30,
    paddingBottom: 48,
    gap: 22,
  },
  title: {
    fontSize: 34,
    lineHeight: 41,
    fontFamily: "Georgia",
    color: colors.text,
  },
  body: { fontSize: 16, lineHeight: 24, color: colors.muted },
  label: { color: colors.text, fontSize: 16, lineHeight: 23 },
  card: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.card,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: colors.peach,
    alignItems: "center",
    minHeight: 54,
  },
  buttonText: { fontSize: 16, fontWeight: "600", color: colors.background },
  input: {
    color: colors.text,
    fontSize: 25,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    minHeight: 62,
  },
  small: { fontSize: 13, lineHeight: 20, color: colors.muted },
});
export function Page({ children }: PropsWithChildren) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
export function Title({ children }: PropsWithChildren) {
  return (
    <Text accessibilityRole="header" style={styles.title}>
      {children}
    </Text>
  );
}
export function Body({ children }: PropsWithChildren) {
  return <Text style={styles.body}>{children}</Text>;
}
export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        secondary && {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.line,
        },
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={[styles.buttonText, secondary && { color: colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}
export function Choice({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[
        styles.card,
        {
          borderWidth: 1,
          borderColor: selected ? colors.peach : colors.line,
          padding: 18,
        },
      ]}
    >
      <Text style={[styles.label, selected && { color: colors.peach }]}>
        {selected ? "●  " : "○  "}
        {title}
      </Text>
    </Pressable>
  );
}
export function Field({
  label,
  value,
  onChange,
  suffix,
  optional = false,
}: {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  suffix?: string;
  optional?: boolean;
}) {
  const [text, setText] = React.useState(
    value === undefined ? "" : String(value),
  );
  React.useEffect(
    () => setText(value === undefined ? "" : String(value)),
    [value],
  );
  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.label}>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </Text>
      <TextInput
        accessibilityLabel={label}
        keyboardType="decimal-pad"
        value={text}
        placeholder={optional ? "Optional" : "Wert eingeben"}
        placeholderTextColor={colors.muted}
        onChangeText={(v) => {
          setText(v);
          onChange(v.trim() === "" ? undefined : Number(v.replace(",", ".")));
        }}
        style={styles.input}
      />
    </View>
  );
}
