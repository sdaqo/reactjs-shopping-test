async function SearchItems(query, client) {
  const res = await client.ft.search("idx:item", query);

  return { status: "success", result: res };
}

export default SearchItems;
