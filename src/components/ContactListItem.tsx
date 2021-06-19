import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContactListItemProps } from '../interfaces';

const ContactListItem:React.FC<ContactListItemProps> = ({name, displayValue, fontAwesomeIcon, className, linkUrl, faPrefix} ) => {

    library.add(fab, fas)

    if(linkUrl) {
        return (<div className={className}><a href={linkUrl} target="_blank" rel="noreferrer" title={name}><FontAwesomeIcon icon={[faPrefix, fontAwesomeIcon]} className="text-primary about-block__icon"></FontAwesomeIcon><span className="text-dark">{displayValue}</span></a></div>);
    } else {
        return (<div className={className}><a href="#nowhere"  rel="noreferrer" title={name}><FontAwesomeIcon icon={[faPrefix, fontAwesomeIcon]} className="text-primary about-block__icon"></FontAwesomeIcon><span className="text-dark">{displayValue}</span></a></div>);
    }


}

export default ContactListItem;