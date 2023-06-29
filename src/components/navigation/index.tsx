import { useEffect, useMemo, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { MdExitToApp } from 'react-icons/md';
import { PERFISLINKS } from '../../utils/menu';
import {
  Active,
  ButtonLink,
  ButtonLogout,
  Nav,
  SubTitle,
  Ul,
  UserInfo,
  UserWrapper,
  ImageStyled,
  TitleGroup,
} from './styledComponents';
import Link from 'next/link';
import { useAuth } from 'src/context/AuthContext';
import { getPerfil } from 'src/services/perfis.service';

type Area = {
  tag: string;
  name: string;
  id: string;
};

export default function Navigation(props) {
  const { pathname } = useRouter();
  const [areas, setAreas] = useState<Area[]>([]);

  const { signOut } = useAuth();

  const [LINKS, setLINKS] = useState(PERFISLINKS);

  useEffect(() => {
    async function loadAreas() {
      const response = await getPerfil(props?.userInfo?.access_profile?.id);

      setAreas(response?.data?.areas ?? []);
    }

    loadAreas();
  }, [props?.userInfo]);

  const filterLinks = useMemo(() => {
    const filter = PERFISLINKS.map((data) => {
      let isVerify = false;
      areas.forEach((area) => {
        if (area.tag === data?.ARE_NOME) {
          isVerify = true;
        }
      });

      if (isVerify) {
        return data;
      } else {
        const options = data.items.filter((item) => {
          let verifyItem = false;

          areas.forEach((area) => {
            if (item.validate || area.tag === item.ARE_NOME) {
              verifyItem = true;
            }
          });

          return verifyItem;
        });

        if (options.length) {
          return {
            grupo: data.grupo,
            items: options,
          };
        }
      }
    });

    return filter;
  }, [areas]);

  return (
    <Nav>
      <UserWrapper>
        <>
          <div className="d-flex pb-2">
            <Image
              src="/assets/images/logoParc.png"
              width={41}
              height={28.8}
              alt=""
            />
            <SubTitle>
              <strong>
                SISTEMA DE GESTÃO
                <br />
                DE BOLSAS
              </strong>
            </SubTitle>
          </div>
          <Link href="/minha-conta" passHref>
            {/* Avatar comentado para resolver a rota da imagem */}
            {props.userInfo.image_profile ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                style={{ cursor: 'pointer' }}
                src={props.userInfo.image_profile_url}
                className="rounded-circle"
                width={42}
                height={42}
                alt="foto usuário"
              />
            ) : (
              <ImageStyled
                src="/assets/images/avatar.png"
                className="rounded-circle"
                width={42}
                height={42}
              />
            )}
          </Link>
          <div className="d-flex justify-content-between align-items-center py-2">
            <Link href="/minha-conta" passHref>
              <UserInfo style={{ cursor: 'pointer' }}>
                <strong>{props.userInfo.name}</strong>
                <br />
                {props.userInfo?.access_profile?.name}
              </UserInfo>
            </Link>
            <div>
              <ButtonLogout onClick={signOut}>
                <MdExitToApp color={'#FFF'} size={24} />
              </ButtonLogout>
            </div>
          </div>
        </>
      </UserWrapper>
      <Ul>
        {filterLinks?.map((x) => (
          <div key={x?.grupo}>
            {x?.grupo && <TitleGroup key={x?.grupo}>{x?.grupo}:</TitleGroup>}
            {x?.items?.map(({ name, path, icon }) => (
              <li key={path}>
                {path === pathname ? (
                  <Active>
                    <div className="pe-2">{icon}</div>
                    {name}
                  </Active>
                ) : (
                  <ButtonLink
                    onClick={() => {
                      Router.push(path);
                    }}
                  >
                    <div className="pe-2">{icon}</div>
                    {name}
                  </ButtonLink>
                )}
              </li>
            ))}
          </div>
        ))}
      </Ul>
    </Nav>
  );
}
