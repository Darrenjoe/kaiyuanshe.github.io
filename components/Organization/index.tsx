import { isEmpty } from 'web-utility';
import dynamic from 'next/dynamic';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PureComponent } from 'react';
import { Badge, Button, Nav } from 'react-bootstrap';
import { text2color } from 'idea-react';

import { CityStatisticMap } from '../CityStatisticMap';
import { OrganizationCardProps } from './Card';
import { OrganizationList } from './List';

import { i18n } from '../../models/Translation';
import organizationStore from '../../models/Organization';

const OrganizationCharts = dynamic(() => import('./Charts'), { ssr: false });

@observer
export class OpenSourceMap extends PureComponent {
  @observable
  tabKey: 'map' | 'chart' = 'map';

  switchFilter: Required<OrganizationCardProps>['onSwitch'] = ({
    type,
    tags,
    city,
  }) => {
    const { filter } = organizationStore;

    organizationStore.clear();

    return organizationStore.getList(
      type
        ? { ...filter, type }
        : tags
        ? { ...filter, tags }
        : city
        ? { city }
        : {},
    );
  };

  renderFilter() {
    const { t } = i18n,
      { filter, totalCount } = organizationStore;

    return (
      !isEmpty(filter) && (
        <header
          className="d-flex justify-content-between align-items-center sticky-top bg-white py-3"
          style={{ top: '5rem' }}
        >
          <div>
            {t('filter')}
            {Object.entries(filter).map(([key, value]) => (
              <Badge
                key={key}
                className="mx-2"
                bg={text2color(value + '', ['light'])}
              >
                {value}
              </Badge>
            ))}
          </div>
          {t('altogether')} {totalCount} {t('companies')}
          <Button
            variant="warning"
            size="sm"
            onClick={() => this.switchFilter({})}
          >
            {t('reset')}
          </Button>
        </header>
      )
    );
  }

  renderTab() {
    const { tabKey } = this,
      { t } = i18n,
      { statistic } = organizationStore;

    return (
      <div>
        <Nav
          variant="pills"
          className="justify-content-center mb-3"
          activeKey={tabKey}
          onSelect={key =>
            key && (this.tabKey = key as OpenSourceMap['tabKey'])
          }
        >
          <Nav.Item>
            <Nav.Link eventKey="map">{t('map')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="chart">{t('chart')}</Nav.Link>
          </Nav.Item>
        </Nav>

        {tabKey !== 'map' ? (
          <OrganizationCharts {...statistic} />
        ) : (
          <CityStatisticMap
            store={organizationStore}
            onChange={city => this.switchFilter({ city })}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderTab()}

        {this.renderFilter()}

        <OrganizationList
          store={organizationStore}
          onSwitch={this.switchFilter}
        />
      </>
    );
  }
}
