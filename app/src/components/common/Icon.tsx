import { Feather, Ionicons } from "@expo/vector-icons";

export default function Icon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size?: number;
}) {
  return <Feather {...props} size={props.size ?? 24} />;
}

export function TranslateIcon(props: { color?: string; size?: number }) {
  return (
    <Ionicons
      name="language-outline"
      size={props.size ?? 24}
      color={props.color ?? "white"}
    />
  );
}
