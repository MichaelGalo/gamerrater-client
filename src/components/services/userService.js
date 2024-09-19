export const getCurrentUser = () => {
    const tokenString = localStorage.getItem("rater_token");
    if (!tokenString) {
        return Promise.reject("No token found");
    }

    const tokenObject = JSON.parse(tokenString);
    const token = tokenObject.token;

    return fetch(`http://localhost:8000/current_user`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => data);
};