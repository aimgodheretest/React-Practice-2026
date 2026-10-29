import { useEffect, useState } from "react";

const ApiFetching = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function gitHubProfile() {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();
      setUsers(data);
    }

    gitHubProfile();
  }, []);
  return (
    <>
      <h1>Github Users Profiles</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {users.map((user) => (
          <img
            src={user.avatar_url}
            width={"100px"}
            height={"100px"}
            border={"1px solid grey"}
            key={user.id}
          />
        ))}
      </div>
    </>
  );
};
export default ApiFetching;
