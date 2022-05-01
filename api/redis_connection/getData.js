async function asyncForEach(array, client) {
  var res = [];
  for (let index = 0; index < array.length; index++) {
    var data = await client.json.GET(array[index]);
    res.push(data);
  }

  return res;
}

async function getData(type, id, client) {
  if (id == "all") {
    const keys = await client.KEYS(`${type}:*`);

    if (keys.length === 0)
      return { status: "fail", reason: "no items of this type" };
    const res = await asyncForEach(keys, client);

    return { status: "success", data: res };
  }
  const res = await client.json.GET(`${type}:${id}`);

  if (!res) {
    return { status: "fail", reason: "not found" };
  }

  return { status: "success", data: res };
}

export default getData;
