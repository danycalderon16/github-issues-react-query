import { useLabels } from "../../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

interface Props {
  selectedLabels: string[];
  onChangeLabel: (labelName:string) => void;
}

export const LabelPicker:React.FC<Props> = ({
  selectedLabels, onChangeLabel
}) => {
  const labelquery = useLabels();

  if (labelquery.isLoading) {
    return <LoadingIcon/>
  }

  return (
    <div>
      {labelquery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name)?"label-active":""}`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick={()=>onChangeLabel(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
