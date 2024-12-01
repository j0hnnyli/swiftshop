import supabase from "@/connectSupaBase";

export const getProducts = async () => {
  const { data } = await supabase.from("products").select();

  return data;
};

// export const getProductsByCategories = async (category: string) => {
//   const fetchQuery = category == 'all' ?
//     `${baseUrl}/products/${category}` :
//     `${baseUrl}/products/categories/${category}`;

//   const response = await fetch(fetchQuery)

//   if(!response.ok) console.log(`fetching ${category} failed`)

//   const data = await response.json();

//   return data;
// }

export const getCategories = async () => {
  const { data } = await supabase.from("categories").select();

  return data;
};

export const getPopular = async () => {
  try {
    const { data } = await supabase.from("populars").select();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Failed populars: ${err.message}`);
    }
  }
};

// export const getSingleProduct = async (id: number) => {
//   const response = await fetch(`${baseUrl}/products/items/${id}`)

//   if(!response.ok) console.log('fetching single Product failed')

//   const data = await response.json();

//   return data;
// }
