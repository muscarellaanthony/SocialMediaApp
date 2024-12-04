import FriendList from "@/components/FriendList";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import FriendRequests from "@/components/rightMenu/FriendRequests";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6 sm:hidden">
          <FriendRequests />
        </div>
        <div className="flex flex-col gap-6">
          <FriendList />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
