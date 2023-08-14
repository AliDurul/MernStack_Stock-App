import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
import { toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";
import { useDispatch } from "react-redux";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/stock/${url}/`);
      dispatch(getStockSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
    }
  };

  const deleteStockData = async (url, id) => {
    dispatch(fetchStart);
    try {
      await axiosWithToken(`/stock/${url}/${id}/`);
      toastSuccessNotify(`${url} succecfuly deleted.`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail);
      toastSuccessNotify(`${url} can not be  deleted!`);
    }
  };

  return { getStockData, deleteStockData };
};

export default useStockCall;
