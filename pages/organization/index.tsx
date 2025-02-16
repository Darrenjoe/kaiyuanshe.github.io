import { observer } from 'mobx-react';
import { FC } from 'react';
import { Container, Button } from 'react-bootstrap';

import PageHead from '../../components/PageHead';
import { OpenSourceMap } from '../../components/Organization';
import { i18n } from '../../models/Translation';
import { withTranslation } from '../api/base';

export const getServerSideProps = withTranslation();

const OrganizationPage: FC = observer(() => {
  const { t } = i18n;

  return (
    <>
      <PageHead title={t('china_open_source_landscape')} />

      <Container>
        <header className="d-flex justify-content-between align-items-center">
          <h1 className="my-4">{t('china_open_source_map')}</h1>
          <div>
            <Button className="me-2" size="sm" href="/organization/landscape">
              {t('panorama')}
            </Button>
            <Button
              variant="success"
              size="sm"
              target="_blank"
              href="https://kaiyuanshe.feishu.cn/share/base/shrcnPgQoUZzkpWB2W4dp2QQvbd"
            >
              {t('join_the_open_source_map')}
            </Button>
          </div>
        </header>

        <OpenSourceMap />
      </Container>
    </>
  );
});

export default OrganizationPage;
