import axios from "axios";
import IDataList from "../model/IDataList";

export const getItemsData = (category : any) => {
  return axios
    .get<IDataList[]>(`http://localhost:4001/${category}`)
    .then((response) => response.data);
};
export const getMovieDeatails = (category : any, id : any) => {
  return axios
    .get<IDataList>(`http://localhost:4001/${category}/${id}`)
    .then((response) => response.data);
};
export const addMovieToFavourite = (key: string, movie: IDataList) => {
  console.log("Inside addToFavourite");

  return axios
    .post<IDataList>(`http://localhost:4001/${key}`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export const removeMovieFromFavourite = (key: string, id: string) => {
  console.log("Inside removeMovieFromFavourite");

  return axios
    .delete<IDataList>(`http://localhost:4001/${key}/${id}`)
    .then((response) => response.data);
};
