import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues, useIssuesInfinite } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery} = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectLabels([...selectedLabels, labelName]);
  };
  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state!!}
            onStateChange={(newState?: State) => setState(newState)}
          />
        )}
        <div className="d-flex mt-4 mb-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={()=>issuesQuery.fetchNextPage()}
            disabled= {issuesQuery.isFetching || !issuesQuery.hasNextPage}>
           {issuesQuery.isFetching ? "Loading...": "Load more"}
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChangeLabel={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
