export const get = async (endpoint) => {
    const response = await fetch(endpoint);
    return await response.json();
};

export const post = async (endpoint, body) => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};
