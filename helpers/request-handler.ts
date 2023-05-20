type Props = {
  title: string;
  page: number;
  limit: number;
  query: string;
};

let endPoint: string;
let toPagination: string;
let type: string[];

export const getSearch = (props: Props) => {
  const { title, page, limit, query } = props;

  if (title === 'popular-anime') {
    endPoint = `top/anime?filter=bypopularity&page=${page}&limit=${limit}&`;
    toPagination = `${title}?`;
    type = ['tv', 'movie', 'ova', 'special', 'ona', 'music'];
  }

  if (title === 'trending') {
    endPoint = `seasons/now?page=${page}&limit=${limit}&`;
    toPagination = `${title}?`;
    type = [];
  }

  if (title === 'upcoming') {
    endPoint = `seasons/upcoming?filter=tv&limit=${limit}&`;
    toPagination = `${title}?`;
    type = [];
  }

  if (title === 'search') {
    endPoint = `anime?q=${query}&page=${page}&sfw&`;
    toPagination = `search?q=${query}&`;
    type = [];
  }

  if (endPoint && endPoint.endsWith('&')) {
    endPoint = endPoint.slice(0, -1);
  }

  return { title, endPoint, type, toPagination };
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
