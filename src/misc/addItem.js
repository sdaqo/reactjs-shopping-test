async function addItem(itemData) {
  const endpoint = `${window.config.api}/add_item`;

  const options = {
    method: "POST",
    body: JSON.stringify(itemData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const status = await fetch(endpoint, options)
    .then((res) => res.json())
    .then((res) => res.status);

  return status;
}

export default addItem;
