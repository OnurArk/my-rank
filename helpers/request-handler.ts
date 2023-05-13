import { ItemData } from './../models/Item';

export const getAnimeByName = async (animeName: string) => {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${animeName}&sfw`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAnimeById = async (id: number) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchApiData = async (endpoint: string) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/${endpoint}`);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSeasonUpcoming = async (): Promise<{ data: ItemData[] }> => {
  return fetchApiData('seasons/upcoming');
};

export const getSeasonNow = async (): Promise<{ data: ItemData[] }> => {
  return fetchApiData('seasons/now');
};

export const getTopAnimes = async (): Promise<{ data: ItemData[] }> => {
  return fetchApiData('top/anime');
};

export const getTopCharacter = async (): Promise<{ data: ItemData[] }> => {
  return fetchApiData('top/characters');
};
