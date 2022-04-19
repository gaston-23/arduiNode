<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h5 class="card-category">Sensor de luz</h5>
                <h2 class="card-title">Intensidad</h2>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <div class="progress m-5">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="getLight" aria-valuemin="0" aria-valuemax="100" :style="'width: '+getLight+'%'"></div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" >
        <card type="">
          <template slot="header">
            <h5 class="card-category">Control de Leds</h5>
          </template>
          <div class="chart-area">
            <div v-for="led in leds" :key="led.ledN">
              <h3 class="mb-2"> <i class="tim-icons icon-bulb-63"></i> Led : {{led.ledN}}</h3>
              <!-- <div class="dropdown  mt-1 ">
                <button type="button" class="btn btn-danger">Action</button>
                <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" @click="encender(led.ledN)">Encender</a>
                  <a class="dropdown-item" @click="apagar(led.ledN)">Apagar</a>
                  <a class="dropdown-item" @click="parpadear(led.ledN)">Parpadear</a>
                </div>
              </div> -->
              <!-- <div class="btn-group">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" >
                  Small button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  
                </div>
              </div> -->
              <div class="row">
                <base-dropdown title-tag="a" class="nav-item ">
                  <a slot="title" href="#" class="btn btn-secondary btn-sm dropdown-toggle " data-toggle="dropdown" aria-expanded="true">
                    Acciones
                  </a>
                  <li class="nav-link">
                    <a href="#"  class="nav-item dropdown-item" @click="encender(led.ledN)">Encender</a>
                  </li>
                  <li class="nav-link">
                    <a href="#"  class="nav-item dropdown-item" @click="apagar(led.ledN)">Apagar</a>
                  </li>
                  <li class="nav-link">
                    <a  href="#" class="nav-item dropdown-item" @click="parpadear(led.ledN)" :hidden="led.ledN == 13" >Parpadear</a> 
                  </li>
                  <li class="nav-link">
                    <a href="#"  class="nav-item dropdown-item" @click="pulso(led.ledN)" :hidden="led.ledN == 13" >Pulso</a>
                  </li>
                  <li class="nav-link">
                    <a href="#"  class="nav-item dropdown-item" @click="strobo(led.ledN)" :hidden="led.ledN == 13" >Strobo</a>
                  </li>
                  <li class="nav-link">
                    <a  href="#" class="nav-item dropdown-item" @click="fade(led.ledN)" :hidden="led.ledN == 13" >Fade</a> 
                  </li>
                  
                </base-dropdown>
                <h4 class="ml-4"> {{led | ledStatus}}</h4>
              </div>
              
            </div>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card >
          <template slot="header">
            <h5 class="card-category">Control manual</h5>
            <h3 class="card-title"><i class="tim-icons icon-light-3 text-info "></i> Led 13</h3>
          </template>
          <div class="row ml-2">
            <button class="btn btn-secondary " @click="getStatus13 == 0 ? encender(13) : apagar(13)"><i class="tim-icons icon-button-power  "></i></button>
            <p class="ml-3" style="align-self:center;">{{getStatus13 == 0 ? 'Apagado':'Encendido'}}</p>
          </div>
          
        </card>
      </div>
      <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div> -->
    </div>
    <!-- <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div> -->
  </div>
</template>
<script>
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  // import TaskList from './Dashboard/TaskList';
  // import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  export default {
    components: {
      // LineChart,
      // BarChart,
      // TaskList,
      // UserTable
    },
    data() {
      return {
        // bigLineChart: {
        //   allData: [
        //     [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        //     [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        //     [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        //   ],
        //   activeIndex: 0,
        //   chartData: {
        //     datasets: [{ }],
        //     labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        //   },
        //   extraOptions: chartConfigs.purpleChartOptions,
        //   gradientColors: config.colors.primaryGradient,
        //   gradientStops: [1, 0.4, 0],
        //   categories: []
        // },
        // purpleLineChart: {
        //   extraOptions: chartConfigs.purpleChartOptions,
        //   chartData: {
        //     labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        //     datasets: [{
        //       label: "Data",
        //       fill: true,
        //       borderColor: config.colors.primary,
        //       borderWidth: 2,
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       pointBackgroundColor: config.colors.primary,
        //       pointBorderColor: 'rgba(255,255,255,0)',
        //       pointHoverBackgroundColor: config.colors.primary,
        //       pointBorderWidth: 20,
        //       pointHoverRadius: 4,
        //       pointHoverBorderWidth: 15,
        //       pointRadius: 4,
        //       data: [80, 100, 70, 80, 120, 80],
        //     }]
        //   },
        //   gradientColors: config.colors.primaryGradient,
        //   gradientStops: [1, 0.2, 0],
        // },
        // greenLineChart: {
        //   extraOptions: chartConfigs.greenChartOptions,
        //   chartData: {
        //     labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
        //     datasets: [{
        //       label: "My First dataset",
        //       fill: true,
        //       borderColor: config.colors.danger,
        //       borderWidth: 2,
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       pointBackgroundColor: config.colors.danger,
        //       pointBorderColor: 'rgba(255,255,255,0)',
        //       pointHoverBackgroundColor: config.colors.danger,
        //       pointBorderWidth: 20,
        //       pointHoverRadius: 4,
        //       pointHoverBorderWidth: 15,
        //       pointRadius: 4,
        //       data: [90, 27, 60, 12, 80],
        //     }]
        //   },
        //   gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
        //   gradientStops: [1, 0.4, 0],
        // },
        // blueBarChart: {
        //   extraOptions: chartConfigs.barChartOptions,
        //   chartData: {
        //     labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        //     datasets: [{
        //       label: "Countries",
        //       fill: true,
        //       borderColor: config.colors.info,
        //       borderWidth: 2,
        //       borderDash: [],
        //       borderDashOffset: 0.0,
        //       data: [53, 20, 10, 80, 100, 45],
        //     }]
        //   },
        //   gradientColors: config.colors.primaryGradient,
        //   gradientStops: [1, 0.4, 0],
        // },
        light_sensor: 60,
        leds: [
          {
            ledN: 9,
            intensity: 30,
            status: 0
          },
          {
            ledN: 10,
            intensity: 50,
            status: 0
          },
          {
            ledN: 11,
            intensity: 70,
            status: 0
          },
          {
            ledN: 13,
            intensity: 100,
            status: 0
          }
        ],
      }
    },
    computed: {

      getLight(){
        return Math.round(this.light_sensor);
      } ,

      getStatus13 (){
        return this.leds.filter(l => l.ledN == 13)[0].status 
      }
      
      // bigLineChartCategories() {
      //   return this.$t('dashboard.chartCategories');
      // }
    },
    sockets:{
      connect: function () {
        this.$socket.emit('listenLight');
        console.log('connected');
      },
      changeLed: function (data) {
        console.log(data[0],data[1]);
        let ledSel = this.leds.filter(l => l.ledN == data[0])[0];
        ledSel.status = data[1]
        console.log(ledSel);
        console.log(this.leds);
      },
      light: function (data) {
        // console.log(Math.round(this.light_sensor));
        this.light_sensor = data*100
      }
        
    },
    methods: {
      // initBigChart(index) {
      //   let chartData = {
      //     datasets: [{
      //       fill: true,
      //       borderColor: config.colors.primary,
      //       borderWidth: 2,
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       pointBackgroundColor: config.colors.primary,
      //       pointBorderColor: 'rgba(255,255,255,0)',
      //       pointHoverBackgroundColor: config.colors.primary,
      //       pointBorderWidth: 20,
      //       pointHoverRadius: 4,
      //       pointHoverBorderWidth: 15,
      //       pointRadius: 4,
      //       data: this.bigLineChart.allData[index]
      //     }],
      //     labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //   }
      //   this.$refs.bigChart.updateGradients(chartData);
      //   this.bigLineChart.chartData = chartData;
      //   this.bigLineChart.activeIndex = index;
      // },
      encender(led){
        console.log(led);
        this.$socket.emit('changeLed',led,1);
      },
      apagar(led){
        console.log('apagar ',led);
        this.$socket.emit('changeLed',led,0);
      },
      parpadear(led){
        console.log('parpadear',led);
        this.$socket.emit('changeLed',led,2);
      },
      pulso(led){
        console.log('pulso',led);
        this.$socket.emit('changeLed',led,3);
      },
      strobo(led){
        console.log('parpadear',led);
        this.$socket.emit('changeLed',led,4);
      },
      fade(led){
        console.log('parpadear',led);
        this.$socket.emit('changeLed',led,100);
      },
    },
    mounted() {
      
      // this.initBigChart(0);
      // setInterval(() => {
      //   console.log(this.led13.static);
      // }, 300);
    },
    beforeDestroy() {
      
    },
    filters: {
      ledStatus: function(led) {
        if (!led) { return '(n/a)'; }
        switch (led.status) {
          case 0:
            return 'Apagado ';
          case 1:
            return 'Encendido al '+led.intensity+'%';
          case 2:
            return 'Parpadeando ';
          case 3:
            return 'Pulso ';
          case 4:
            return 'Strobo';
          default:
            return 'Fade al '+led.intensity+'%';
        }
          
      }
    }
  };
</script>
<style>
</style>
