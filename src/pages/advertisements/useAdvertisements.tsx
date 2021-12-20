import { useEffect, useState } from "react";
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const useAdvertisements = (createdBy?: string) => {
  const dataLimit = 10;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  // functions
  const getCars = (pageValue = page) => {
    setIsLoading(true);
    let endpoint = `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}?limit=${dataLimit}&page=${pageValue}`;
    endpoint += keywords ? "&keyword=" + keywords : "";
    endpoint += createdBy ? "&createdBy=" + createdBy : "";
    getData(endpoint)
      .then((response: any) => {
        window.scrollTo(0, 0);
        if (response && response.data && response.data.status === "success") {
          setData(response.data);
          setResult(response.data.data.result);
          setPage(pageValue);
          setTotalCount(response.data.totalCount)
          let totalPages = Math.ceil(response.data.totalCount / dataLimit);
          setPageCount(totalPages);
        } else {
          setToastMessage(response.data.message);       
          setToastOpen(true);
          setToastType("error");
        }
      })
      .then(() => setIsLoading(false));
  };

  //   useEffects
  useEffect(() => {
    getCars();
  }, [reload]);

  //   return
  return {
    data,
    result,
    page,
    isLoading,
    reload,
    setReload,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    setPage,
    pageCount,
    keywords,
    setKeywords,
    getCars,
    totalCount
  };
};

export default useAdvertisements;
