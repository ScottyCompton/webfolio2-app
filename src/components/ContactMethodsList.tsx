import {useAppSelector} from '../hooks/redux-hooks';
import ContactListItem from './ContactListItem';


const ContactMethodsList:React.FC = () => {
    const contactItems = useAppSelector(state => state.appData.contactItems);

    let out = null;

    if(contactItems && contactItems.length !== 0) {
        out =  contactItems.map((item) => {
            return (
                <ContactListItem key={`contact-list-item-${Math.random()}`} {...item} className="about-contact-block" />
            )
        })
    }

    
    return (
        <div>{out}</div>

    );

}

export default ContactMethodsList;