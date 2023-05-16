import { useEffect, useState } from 'react';

import { ItemData } from '../models/Item-Type';

type Returns = {
  arrData: ItemData[];
  error: boolean;
  isLoading: boolean;
};

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
