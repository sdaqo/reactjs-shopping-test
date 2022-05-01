async function addItem(data, client) {
  if (!data.itemId) {
    return { status: "fail" };
  }

  const res = await client.json.SET(`item:${data.itemId}`, "$", data);

  if (res === "OK") {
    return { status: "success" };
  }

  return { status: "fail" };
}
export default addItem;
