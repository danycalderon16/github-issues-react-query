import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";



export const ListView =() => {
  const [selectedLabels, setSelectLabels] = useState<string[]>([]);

  const onLabelChange = (labelName:string) => {
    (selectedLabels.includes(labelName))
    ? setSelectLabels(selectedLabels.filter(label=> label!== labelName))
    : setSelectLabels([...selectedLabels, labelName])
  }
  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList />
      </div>

      <div className="col-4">
        <LabelPicker 
        selectedLabels = {selectedLabels}
        onChangeLabel = {(labelName)=> onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
