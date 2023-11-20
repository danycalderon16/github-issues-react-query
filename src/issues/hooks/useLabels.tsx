import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>("/labels?per_page=100");
  return data;
};

export const useLabels = () => {
  const labelQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime:1000*60*60,
    // initialData:[
    //   {
    //     id: 791921801,
    //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     name: "❤️",
    //     color: "ffffff",
    //     default: false,
    //   },
    //   {
    //     id: 717031390,
    //     node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
    //     url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
    //     name: "good first issue",
    //     color: "6ce26a",
    //     default: true,
    //   },
    // ],
    // placeholderData: [
    //   {
    //     id: 791921801,
    //     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
    //     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
    //     name: "❤️",
    //     color: "ffffff",
    //     default: false,
    //   },
    //   {
    //     id: 717031390,
    //     node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
    //     url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
    //     name: "good first issue",
    //     color: "6ce26a",
    //     default: true,
    //   },
    // ],
  });

  return labelQuery;
};
