<template>
  <v-app :dark="true">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        
        

        <!-- Circle statistic -->
        <v-flex lg4 sm12 xs12 v-for="(item,index) in trending" :key="'c-trending'+index">
          <circle-statistic
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :icon="item.icon.label"
            :color="item.linear.color"
            :value="item.linear.value"
          >
          </circle-statistic>
        </v-flex>


        
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import API from '@/api';
  import EChart from '@/components/chart/echart';
  import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
  import PostListCard from '@/components/widgets/card/PostListCard';
  import ProfileCard from '@/components/widgets/card/ProfileCard';
  import PostSingleCard from '@/components/widgets/card/PostSingleCard';
  import WeatherCard from '@/components/widgets/card/WeatherCard';
  import PlainTable from '@/components/widgets/list/PlainTable';
  import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
  import VWidget from '@/components/VWidget';
  import Material from 'vuetify/es5/util/colors';
  import VCircle from '@/components/circle/VCircle';
  import BoxChart from '@/components/widgets/chart/BoxChart';
  import ChatWindow from '@/components/chat/ChatWindow';
  import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
  import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';
  import Calendar from '@/components/base/Calendar'
  import ProjectList from "@/components/crm/project/List";

  export default {
    layout: 'dashboard',
    components: {
      ProjectList,
      Calendar,
      VWidget,
      MiniStatistic,
      ChatWindow,
      VCircle,
      WeatherCard,
      PostSingleCard,
      PostListCard,
      ProfileCard,
      EChart,
      BoxChart,
      CircleStatistic,
      LinearStatistic,
      PlainTable,
      PlainTableOrder
    },
    data: () => ({
      color: Material,
      selectedTab: 'tab-1',
      linearTrending: [
        {
          subheading: 'Sales',
          headline: '2,55',
          caption: 'increase',
          percent: 15,
          icon: {
            label: 'trending_up',
            color: 'success'
          },
          linear: {
            value: 15,
            color: 'success'
          }
        },
        {
          subheading: 'Revenue',
          headline: '6,553',
          caption: 'increase',
          percent: 10,
          icon: {
            label: 'trending_down',
            color: 'error'
          },
          linear: {
            value: 15,
            color: 'error'
          }
        },
        {
          subheading: 'Orders',
          headline: '5,00',
          caption: 'increase',
          percent: 50,
          icon: {
            label: 'arrow_upward',
            color: 'info'
          },
          linear: {
            value: 50,
            color: 'info'
          }
        }
      ],
      trending: [
        {
          subheading: 'EPIs',
          headline: '15+',
          caption: 'EPIs Pendentes',
          percent: 40,
          icon: {
            label: 'epi',
            color: 'info'
          },
          linear: {
            value: 40,
            color: 'info'
          }
        },
        {
          subheading: 'Ferramentas e Equipamentos',
          headline: '70%',
          caption: 'Ferramentas e Equipamentos entregues.',
          percent: 70,
          icon: {
            label: 'list',
            color: 'primary'
          },
          linear: {
            value: 70,
            color: 'success'
          }
        },
        {
          subheading: 'Gas',
          headline: '20%',
          caption: 'Botijas de Gas em projetos.',
          percent: 20,
          icon: {
            label: 'bug_report',
            color: 'primary'
          },
          linear: {
            value: 20,
            color: 'error'
          }
        },
      ]
    }),
    computed: {
      activity () {
        return API.getActivity();
      },
      posts () {
        return API.getPost(3);
      },
      siteTrafficData () {
        return API.getMonthVisit;
      },
      locationData () {
        return API.getLocation;
      }
    },

  };
</script>
