async function fetchFunction(): Promise<object[]> {
  const res = await fetch('https://reqres.in/api/users');
  const data = await res.json();
  return data.data;
}

const Home = async () => {
  const users = await fetchFunction();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
};

export default Home;
