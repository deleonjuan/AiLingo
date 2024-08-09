import OneOfFour from "./OneOfFour.exercise";
import OneOfThree from "./OneOfThree.exercise";

const ExerciseSelector = (props: any) => {
  const options = {
    "1OF4": () => <OneOfFour {...props} />,
    "1OF3": () => <OneOfThree {...props} />,
  } as any;

  return options[props.modality]();
};

export default ExerciseSelector;
