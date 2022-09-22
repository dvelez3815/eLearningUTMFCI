export  async function getProgress (userid) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/progress/${userid}`, {
        method: "POST",
        headers: {
          'token': process.env.REACT_APP_SECRET_TOKEN
        },
      });
      const progress = await response.json();
      return progress;
}