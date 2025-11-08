
type HeaderBarProps = {
  isSetupVisible: boolean;
  setIsSetupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};


export function HeaderBar({ isSetupVisible, setIsSetupVisible }: HeaderBarProps) {
  function newGameBtnHandleClick() {
    setIsSetupVisible(!isSetupVisible);
  }
  
  return (
    <header className="bg-[rgba(57,50,82,0.7)] text-[#E4DCCF] flex items-center justify-between  py-2 shadow-md rounded-lg">
      <h1 className="opacity-100 pl-2 text-lg font-semibold">BoTCT Notes</h1>
      <button onClick={newGameBtnHandleClick} className="bg-[#9a61da] hover:bg-[#5d3077] text-[#E4DCCF] rounded-md px-3 py-1 font-medium transition-colors">
        New Game
      </button>
    </header>
  );
}