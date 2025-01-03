const Table = () => {
  return (
    <div>
      <div
        className="bg-[#D9D9D9] p-9 w-[1440px] mx-auto"
        style={{
          backgroundImage: "url('/src/assets/image/BackGround.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "1100px",
          mainHeight: "screen",
        }}
      >
        <h1 className="text-3xl">LIST OF STUDENTS/ALUMNI'S RECORDS</h1>
        <div className="border-b-[5px] border-[#F3BC62] my-3 w-[600px] tracking-wider"></div>
      </div>
    </div>
  );
};

export default Table;
