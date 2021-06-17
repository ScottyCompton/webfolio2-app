import {useAppSelector} from '../hooks/redux-hooks';
import ContactListItem from './ContactListItem';
import {v4 as uuidv4 } from 'uuid';


const ContactMethodsList:React.FC = () => {
    const contactItems = useAppSelector(state => state.appData.contactItems);

    let out = null;

    if(contactItems && contactItems.length !== 0) {
        out =  contactItems.map((item) => {
            return (
                <ContactListItem key={uuidv4()} {...item} className="about-contact-block" />
            )
        })
    }

    
    return (
        <div>{out}</div>

    );

}

export default ContactMethodsList;