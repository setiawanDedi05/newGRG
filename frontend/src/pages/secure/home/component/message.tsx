import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as color from "../../../../config/color";
import styled from "styled-components"
import { IPost } from "../../../../services/dto/post"
import { device } from "../../../../config/constants";
import { useNavigate } from "react-router-dom";

const messagesDummy = [
    {
        id: 1,
        name: "Dedi Setiawan",
        avatar: "https://i.pravatar.cc/100",
        place: "Tokyo",
        time: "1 Min ago",
        image: "https://picsum.photos/500/200",
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
    },
    {
        id: 2,
        name: "Puzha Fauzha",
        time: "1 hour ago",
        place: "Germany",
        avatar: "https://i.pravatar.cc/100",
        image: "https://picsum.photos/500/200",
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
    },
    {
        id: 3,
        name: "Ibnu Malik",
        avatar: "https://i.pravatar.cc/100",
        time: "1 hour ago",
        place: "Japan",
        image: "https://picsum.photos/500/200",
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
    },
    {
        id: 4,
        avatar: "https://i.pravatar.cc/100",
        name: "Arif Ibrahim",
        time: "1 hour ago",
        place: "Arab",
        image: "https://picsum.photos/500/200",
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
    },
    {
        id: 5,
        avatar: "https://i.pravatar.cc/100",
        name: "Anwar Sanusi",
        time: "1 hour ago",
        place: "Arab",
        image: "https://picsum.photos/500/200",
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet reiciendis expedita quia, animi consectetur dolores inventore nobis ab sint odio! Facilis molestiae hic facere quas nesciunt, ducimus libero amet!"
    },
];

const MessageContainer = styled.div`
    display: none;
    transition: all 1s;
    @media ${device.tablet} {
        display: block;
        background-color: ${color.light};
        box-shadow: 2px 0 5px -2px #888;
        height: 100%;
        min-width: 250px;
        width: 30%;
        position: fixed;
        left: 85px;
        float: left;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        z-index: 1;
    }
`

const MessageActionContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 50px;
    border-bottom: 2px dashed ${color.gray};
`

const MessageInputSearchContainer = styled.form`
    display: flex;
    border-radius: 8px;
    padding: 8px 16px;
    background-color: ${color.light};
    width: 80%;
    gap: 20px;
    align-items: center;
    box-shadow: 5px 5px 2px ${color.gray};
    &:hover{
        box-shadow: none;
        transform: translateY(4px);
        border: 1px dashed ${color.green};
        cursor: pointer;
    }
`

const MessageInputSearch = styled.input`
    width: 130px;
    background-color: ${color.light};
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
`

const MessageContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    >:not(:last-child){
        border-bottom: 1px solid ${color.secondary};
    }
`

const MessageItem = styled.div`
    display: flex;
    padding: 10px 20px;
    width: 100%;
    align-items: center;
    gap: 20px;
    transition: all 5ms;
    &:hover{
        cursor: pointer;
        background-color: ${color.gray};
    }
`

const AuthorAvatar = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${color.white};
`

const AuthorNameContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const AuthorName = styled.div`
    color: ${color.secondary};
    font-weight: bold;
`

const Caption = styled.span`
    font-weight: 400;
`

export default function MessageComponent() {
    const navigate = useNavigate();

    const onClickHandler = (id: number) => {
        navigate('/secure/chat/' + id);
    }

    return <MessageContainer>
        <MessageActionContainer>
            <MessageInputSearchContainer>
                <FontAwesomeIcon icon={faSearch} size="xl" />
                <MessageInputSearch />
            </MessageInputSearchContainer>
        </MessageActionContainer>
        <MessageContentContainer>
            {
                messagesDummy.map(({ id, name, avatar }: IPost) => {
                    return <MessageItem key={id} onClick={() => onClickHandler(id)}>
                        <AuthorAvatar src={avatar} alt={`${id}-avatar`} />
                        <AuthorNameContainer>
                            <AuthorName>{name}</AuthorName>
                            <Caption>Lorem ipsum dolor sit.</Caption>
                        </AuthorNameContainer>
                    </MessageItem>
                })
            }
        </MessageContentContainer>
    </MessageContainer>
}