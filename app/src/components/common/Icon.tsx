import { Feather } from "@expo/vector-icons";

export default function Icon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size?: number;
}) {
  return <Feather {...props}  size={props.size ?? 24}/>;
}
