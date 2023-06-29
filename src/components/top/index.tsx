import Notification from '../notification';
import Search from '../search';
import { useRouter } from 'next/router';
import { Container, ButtonVoltar, IconArrowBack } from './styledComponents';
import PageTitle from 'src/components/pageTitle';

export default function Top({ title, searchOpen = false }) {
  const router = useRouter();

  return (
    <Container className="col-12">
      <div className="d-flex align-items-center">
        <ButtonVoltar onClick={() => router.back()}>
          <IconArrowBack size={28} />
        </ButtonVoltar>

        <PageTitle>{title}</PageTitle>
      </div>
      <div className="d-flex align-items-center">
        {/* <Search open={searchOpen} />
        <Notification /> */}
      </div>
    </Container>
  );
}
