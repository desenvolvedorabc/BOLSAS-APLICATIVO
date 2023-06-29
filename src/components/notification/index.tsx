import { useEffect, useState } from 'react';
import {
  MdOutlineNotifications,
  MdClose,
  MdOutlineEmail,
} from 'react-icons/md';
import {
  Button,
  NotificationNumber,
  NotificationList,
  Top,
  Title,
  CardNotification,
  TitleNotification,
  Data,
} from './styledComponents';
import { getNotifications } from 'src/services/notificacoes.service';
import MailOpen from 'public/assets/images/mailOpen.svg';
import { ModalNotification } from '../modalNotification';
import { formatDate } from 'src/utils/date';

export default function Notification() {
  const [qntNotification, setQntNotification] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalShowNotification, setModalShowNotification] = useState(false);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [notificationList, setNotificationList] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const loadNotifications = async () => {
    const resp = await getNotifications(page, limit);

    const filterNotifications = resp.data?.items?.filter((x) => !x.isReading);

    setQntNotification(filterNotifications?.length ?? 0);

    setNotificationList(resp.data?.items);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filterNotificationSelect = () => {
    // setNotificationList((oldState) =>
    //   oldState.filter((data) => data.id !== selectedNotification)
    // );
    setQntNotification((oldState) => oldState - 1);
  };

  const selectNotification = (id) => {
    setSelectedNotification(id);
    setModalShowNotification(true);
  };

  return (
    <div style={{}}>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <MdOutlineNotifications
          color={'#3E8277'}
          size={32}
          style={{ margin: 'auto', padding: 3 }}
        />
        {qntNotification > 0 && (
          <NotificationNumber>{qntNotification}</NotificationNumber>
        )}
      </Button>
      {isOpen && (
        <NotificationList open={isOpen}>
          <Top>
            <MdClose
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              size={16}
              style={{ cursor: 'pointer' }}
            />
            <Title>NOTIFICAÇÕES</Title>
          </Top>
          {notificationList.map((notification) => (
            <CardNotification
              key={notification.id}
              onClick={() => {
                selectNotification(notification.id);
              }}
            >
              <div>
                <TitleNotification read={notification.isReading}>
                  {notification.title}
                </TitleNotification>
                <Data>{formatDate(notification.createdAt, 'dd/MM/yyyy')}</Data>
              </div>
              <div>
                {notification.isReading ? (
                  <MailOpen color={'#B3B3B3'} size={22} />
                ) : (
                  <MdOutlineEmail color={'#3E8277'} size={18} />
                )}
              </div>
            </CardNotification>
          ))}
        </NotificationList>
      )}
      <ModalNotification
        show={modalShowNotification}
        onHide={() => {
          filterNotificationSelect();
          setModalShowNotification(false);
        }}
        notification={selectedNotification}
      />
    </div>
  );
}
