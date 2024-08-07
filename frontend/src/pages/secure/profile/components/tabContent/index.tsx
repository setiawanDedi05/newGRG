import FollowingTabContent from "../following";
import FollowerTabContent from "../follower";
import PostTabContent from "../post";

const TabContent = (props: any) => {
    switch (props.index) {
        case 1:
            return <FollowerTabContent />
        case 2:
            return <FollowingTabContent />
        default:
            return <PostTabContent />
    }
}

export default TabContent;