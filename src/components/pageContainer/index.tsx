import { PageContainerStyled, Saev, Text } from './styledComponents';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

export default function PageContainer({ children }) {
  return (
    <main className="d-flex col-12" style={{ height: '100%' }}>
      <PageContainerStyled>
        <div>{children}</div>
        {/* <Saev>
          <Text>
            SAEV - Feito com dedicação por ONG Bem Comum
          </Text>
          <MdOutlineEmojiEmotions color="#3E8277" size={12}/>
        </Saev> */}
      </PageContainerStyled>
    </main>
  );
}
