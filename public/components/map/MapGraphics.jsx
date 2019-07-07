import React from "react";
//import Classroom from "MapClassroom"
import "./MapGraphics.scss";

export default class MapMain extends React.Component {
  render() {
    return (
      <svg>
        <defs>
          <symbol id="symbol-exit">
            <g transform="scale(0.7 0.7)">
              <path fill="#269463" d="M471.9,510.8l-3.2-8.5c-1.4-3.5-4.6-5.9-8.6-5.9h-1.4v-73.2h-69.5v40.5h9.1l10.4-13 c2.1-2.4,5.3-4,8.8-4h22.2c3.5,0,6.6,1.9,8.2,5l6.6,12.5c0.3,0.5,0.5,1.1,0.5,1.9c0,2.2-1.9,4.2-4.2,4.2c-1.8,0-3-0.8-3.8-2.2 l-5.9-11.4h-9.6l7.4,18.4l2.2,23.5h19c3,0,5.4,1.9,6.6,4.5l2.1,5.4H436c-2.4,0-4.5-1.8-4.6-4.2l-2.2-20.6l-17.6,36.5
			                    c-1,2.1-3.2,3.5-5.8,3.5h-8.5l21.6-44.7l-6.7-16.8l-6.4,7.8c-1.6,2.1-4.3,3.5-7.2,3.5h-9.4v52.8l15,14.9h-44.3V413.3h128.1v128.1
			                    h-14.4l-14.9-14.9v-15.7H471.9"></path>
              <path fill="#269463" d="M412,428l0.5,0l0.5,0l0.5,0.1l0.4,0.1l0.4,0.1l0.4,0.1l0.4,0.2l0.4,0.2l0.4,0.2l0.4,0.2
			                    l0.4,0.2l0.4,0.2l0.3,0.3l0.3,0.3l0.3,0.3l0.3,0.3l0.3,0.3l0.3,0.3l0.3,0.3l0.3,0.4l0.2,0.4l0.2,0.4l0.2,0.4l0.2,0.4l0.2,0.4
			                    l0.1,0.4l0.1,0.4l0.1,0.4l0.1,0.4l0.1,0.5l0,0.5l0,0.5c0,5-4.2,9-9.1,9c-5,0-9-4-9-9S407.1,428,412,428z"></path>
              <path fill="#269463" d="M416,529.8l11.5,11.5h-13.9l-15-14.9h9C410.7,526.4,413.8,527.7,416,529.8z"></path>
            </g>
          </symbol>
          <symbol id="symbol-elevator">
            <g transform="translate(-1002, 1052) rotate(-90)">
              <path className="map-elevator-symbol"
                    d="m 3.4029395,1052.1168 c -0.3627573,-0.1311 -0.8468717,-0.3541 -1.0758097,-0.4956 -0.6608242,-0.4084 -1.56534509,-1.4545 -1.92962469,-2.2317 l -0.33500702,-0.7148 0,-21.3125 0,-21.3125 0.33862125,-0.7227 c 0.44448145,-0.9485 1.57438986,-2.1229 2.46186326,-2.5588 l 0.6995155,-0.3435 21.3749999,0 21.375,0 0.6875,0.3246 c 1.54091,0.7277 2.637573,2.2027 2.878894,3.8723 0.165456,1.1447 0.156586,40.442 -0.0094,41.4906 -0.25786,1.6294 -1.345051,3.1023 -2.826207,3.829 l -0.730824,0.3585 -21.125,0.028 c -20.5018938,0.027 -21.1444544,0.021 -21.7845585,-0.2106 z m 41.7837275,-3.5046 c 0.395464,-0.198 0.761879,-0.5111 1,-0.8545 l 0.375831,-0.542 0.03684,-19.583 c 0.02608,-13.8626 -0.0029,-19.7205 -0.09939,-20.0538 -0.160029,-0.5531 -0.752165,-1.2669 -1.29976,-1.5668 -0.359176,-0.1968 -1.799144,-0.2152 -19.575195,-0.2498 -10.553125,-0.021 -19.4784579,0 -19.8340734,0.039 -0.8270531,0.098 -1.6412588,0.6297 -2.046055,1.3366 l -0.3073715,0.5368 0,19.6875 0,19.6875 0.342644,0.5829 c 0.3914079,0.6658 0.9640041,1.0673 1.7428866,1.222 0.2967081,0.059 9.2019693,0.099 19.7894693,0.089 l 19.25,-0.018 0.624169,-0.3125 z m -18.54476,-16.0625 0.0413,-6.0625 6.629336,5.9781 0.06424,-16.9781 4.24653,0 0.06424,16.9797 6.841025,-5.8996 0.07942,5.6074 -9.090975,8.6926 z m -14.204405,-9.8426 -6.5937499,5.9032 -0.09375,-5.8364 8.8855129,-8.3492 8.989487,8.6192 -0.15625,5.5621 -6.78125,-5.8768 -0.06424,16.883 -4.121505,0 z"></path>
            </g>
          </symbol>
          <symbol id="symbol-bathroomA">
            <g className="map-bathroom-symbol">
              <g>
                <path
                  d="m506.117,171.583c-11.93,3.1 -15.87,3.08 -27.99,-0.17c-11.78,-3.16 -18.61,-7.36 -27.33,-16.81c-19.04,-20.6 -18.85,-53.5 0.42,-74.89c23.22,-25.78 65.83,-23.65 86.17,4.29c23.88,32.82 7.98,77.38 -31.27,87.58z"></path>
                <path
                  d="m623.057,348.183c0,87.77 -0.21,94.42 -3.15,99.9c-8.53,15.87 -34.26,15.94 -42.18,0.11c-2.75,-5.49 -3.02,-13.44 -3.02,-88.34l-0.01,-82.29l-10.31,0l-0.46,223.62l-0.45,223.63l-4.73,8.03c-12.92,21.93 -49.26,19.27 -58.2,-4.26c-1.24,-3.28 -1.84,-47.71 -1.84,-137.45l0,-132.6l-10.36,0l0,127.45c0,85.42 -0.62,130.35 -1.88,136.21c-2.26,10.52 -8.47,18.37 -17.91,22.65c-8.18,3.71 -20.38,4.06 -27.71,0.8c-6.43,-2.87 -13.87,-10.65 -16.29,-17.06c-1.27,-3.34 -1.84,-74.51 -1.84,-227.94l0,-223.08l-12.09,0l-0.01,83.16c0,80.37 -0.12,83.35 -3.49,88.86c-8.94,14.64 -33.46,13.74 -41.74,-1.53c-3.03,-5.58 -3.18,-11.29 -2.73,-105c0.46,-96.79 0.56,-99.31 4.18,-108.1c8.09,-19.68 23.82,-35.06 43.32,-42.37c9.46,-3.55 13.27,-3.77 74.44,-4.31c69.14,-0.61 81.02,0.28 96.19,7.22c11.68,5.33 26.39,18.95 32.43,30.04c9.619,17.63 9.84,20.43 9.84,122.65z"></path>
              </g>
              <g>
                <path
                  d="m227.496,119.797c-0.01,15.62 -3.92,25.79 -14.26,37.08c-9.59,10.47 -15.14,13.9 -28.06,17.34c-14.71,3.91 -28.05,1.79 -42.69,-6.77c-23.56,-13.78 -33.3,-45.45 -21.69,-70.56c9.29,-20.09 28.8,-32.68 50.76,-32.76c16.83,-0.06 27.48,4.42 39.54,16.61c12.26,12.399 16.41,22.29 16.4,39.06z"></path>
                <path
                  d="m329.386,413.116c0,11.43 -6.98,20.92 -17.47,23.74c-8.12,2.18 -19.01,-1.7 -23.87,-8.52c-1.81,-2.54 -13.11,-37.55 -25.1,-77.79s-22.2,-74.53 -22.7,-76.19c-0.63,-2.11 -2.68,-3.01 -6.83,-3.01c-3.26,0 -5.93,0.4 -5.93,0.89s16.71,58.18 37.14,128.21c20.42,70.03 37.13,127.8 37.13,128.38c0,0.58 -15.53,1.05 -34.5,1.05l-34.51,0l-0.47,102.42c-0.46,100.39 -0.54,102.52 -4.03,107.19c-9.27,12.39 -22.26,15.7 -35.17,8.96c-14.58,-7.61 -13.95,-2.24 -13.95,-117.29l0,-101.28l-15.54,0l0,100.88c0,110.37 0.14,108.83 -10.11,116.1c-6.7,4.77 -20.04,6.26 -27.02,3.02c-7.03,-3.25 -12.69,-9.7 -14.72,-16.77c-1.01,-3.51 -1.69,-45.52 -1.69,-104.55l0,-98.68l-34.54,0c-19,0 -34.54,-0.37 -34.54,-0.81c0,-0.63 69.69,-241.85 73.58,-254.71c0.74,-2.45 -0.16,-3.01 -4.83,-3.01l-5.76,0l-17.95,60.75c-27.43,92.85 -27.33,92.55 -33.81,99.01c-4.89,4.88 -6.9,5.7 -14.08,5.69c-14.55,-0.01 -24.79,-9.79 -24.79,-23.7c0,-6.54 50.47,-172.29 55.56,-182.46c9.18,-18.36 31.3,-34.42 53.06,-38.54c11.99,-2.27 86.68,-2.29 98.83,-0.03c20.17,3.76 42.19,19.37 52.79,37.43c5.54,9.43 55.82,174.831 55.82,183.62z"></path>
              </g>
              <g>
                <g>
                  <path
                    d="m1037.717,603.424c-32.79,73.1 -105.71,124.45 -191.02,124.45c-115.92,0 -209.74,-94.01 -209.74,-209.78c0,-75.04 39.79,-140.31 99.05,-177.32l3.04,51.86c-35.41,30.44 -58.17,75.21 -58.17,125.46c0,91.74 74.27,165.85 165.82,165.85c79.66,0 145.75,-56.65 161.52,-131.61l29.5,51.09z"></path>
                  <path
                    d="m1127.067,631.424c-15.43,9.19 -35.92,3.29 -44.76,-11.21l-73.94,-128.17l-180.91,0c-29.5,0.18 -54.37,-21.08 -56.81,-50.67l-9.78,-169.48c-1.43,-29.59 21.08,-55.31 50.92,-57c29.67,-1.6 54.8,21.42 56.81,50.76l3.63,47.9l104.36,0c14.17,0.5 25.21,11.38 25.21,25.38c0,14.16 -11.38,24.7 -25.21,25.55l-101.41,0l1.35,42.15l139.6,0c10.7,0.34 21.08,5.91 26.97,15.77l95.18,164.42c8.76,16.1 4.13,35.33 -11.21,44.6z"></path>
                </g>
                <path
                  d="m830.279,197.702c-11.93,3.1 -15.87,3.08 -27.99,-0.17c-11.78,-3.16 -18.61,-7.36 -27.33,-16.81c-19.04,-20.6 -18.85,-53.5 0.42,-74.89c23.22,-25.78 65.83,-23.65 86.17,4.29c23.88,32.82 7.98,77.38 -31.27,87.58z"></path>
              </g>
            </g>
          </symbol>
          <symbol id="symbol-bathroomM">
            <g className="map-bathroom-symbol">
              <path d="M666.117,167.583c-11.93,3.1-15.87,3.08-27.99-0.17c-11.78-3.16-18.61-7.36-27.33-16.81
			c-19.04-20.6-18.85-53.5,0.42-74.89c23.22-25.78,65.83-23.65,86.17,4.29C721.267,112.823,705.367,157.383,666.117,167.583z"></path>
              <path d="M783.057,344.183c0,87.77-0.21,94.42-3.15,99.9c-8.53,15.87-34.26,15.94-42.18,0.11
			c-2.75-5.49-3.02-13.44-3.02-88.34l-0.01-82.29h-10.31l-0.46,223.62l-0.45,223.63l-4.73,8.03c-12.92,21.93-49.26,19.27-58.2-4.26
			c-1.24-3.28-1.84-47.71-1.84-137.45v-132.6h-10.36v127.45c0,85.42-0.62,130.35-1.88,136.21c-2.26,10.52-8.47,18.37-17.91,22.65
			c-8.18,3.71-20.38,4.06-27.71,0.8c-6.43-2.87-13.87-10.65-16.29-17.06c-1.27-3.34-1.84-74.51-1.84-227.94v-223.08h-12.09
			l-0.01,83.16c0,80.37-0.12,83.35-3.49,88.86c-8.94,14.64-33.46,13.74-41.74-1.53c-3.03-5.58-3.18-11.29-2.73-105
			c0.46-96.79,0.56-99.31,4.18-108.1c8.09-19.68,23.82-35.06,43.32-42.37c9.46-3.55,13.27-3.77,74.44-4.31
			c69.14-0.61,81.02,0.28,96.19,7.22c11.68,5.33,26.39,18.95,32.43,30.04C782.836,239.163,783.057,241.963,783.057,344.183z"></path>
            </g>
          </symbol>
          <symbol id="symbol-bathroomW">
            <g className="map-bathroom-symbol">
              <path
                d="m227.496,119.797c-0.01,15.62 -3.92,25.79 -14.26,37.08c-9.59,10.47 -15.14,13.9 -28.06,17.34c-14.71,3.91 -28.05,1.79 -42.69,-6.77c-23.56,-13.78 -33.3,-45.45 -21.69,-70.56c9.29,-20.09 28.8,-32.68 50.76,-32.76c16.83,-0.06 27.48,4.42 39.54,16.61c12.26,12.399 16.41,22.29 16.4,39.06z"></path>
              <path
                d="m329.386,413.116c0,11.43 -6.98,20.92 -17.47,23.74c-8.12,2.18 -19.01,-1.7 -23.87,-8.52c-1.81,-2.54 -13.11,-37.55 -25.1,-77.79s-22.2,-74.53 -22.7,-76.19c-0.63,-2.11 -2.68,-3.01 -6.83,-3.01c-3.26,0 -5.93,0.4 -5.93,0.89s16.71,58.18 37.14,128.21c20.42,70.03 37.13,127.8 37.13,128.38c0,0.58 -15.53,1.05 -34.5,1.05l-34.51,0l-0.47,102.42c-0.46,100.39 -0.54,102.52 -4.03,107.19c-9.27,12.39 -22.26,15.7 -35.17,8.96c-14.58,-7.61 -13.95,-2.24 -13.95,-117.29l0,-101.28l-15.54,0l0,100.88c0,110.37 0.14,108.83 -10.11,116.1c-6.7,4.77 -20.04,6.26 -27.02,3.02c-7.03,-3.25 -12.69,-9.7 -14.72,-16.77c-1.01,-3.51 -1.69,-45.52 -1.69,-104.55l0,-98.68l-34.54,0c-19,0 -34.54,-0.37 -34.54,-0.81c0,-0.63 69.69,-241.85 73.58,-254.71c0.74,-2.45 -0.16,-3.01 -4.83,-3.01l-5.76,0l-17.95,60.75c-27.43,92.85 -27.33,92.55 -33.81,99.01c-4.89,4.88 -6.9,5.7 -14.08,5.69c-14.55,-0.01 -24.79,-9.79 -24.79,-23.7c0,-6.54 50.47,-172.29 55.56,-182.46c9.18,-18.36 31.3,-34.42 53.06,-38.54c11.99,-2.27 86.68,-2.29 98.83,-0.03c20.17,3.76 42.19,19.37 52.79,37.43c5.54,9.43 55.82,174.831 55.82,183.62z"></path>
            </g>
          </symbol>
        </defs>
        <g id="mapGraphicsMainGroup" transform="translate(850,-200)rotate(90)">
          <g id="mapFloor1" visibility={this.props.floor === 1 ? 'visible' : 'hidden'}>
            <polygon points="308.28,134.399 308.28,150.96 266.578,150.96 266.579,331.625 712.08,331.625 712.08,498.719
	263.88,498.719 263.88,679.861 694.2,679.862 694.2,662.88 754.2,662.88 754.2,681 822.6,681 822.6,626.28 864.36,626.28
	864.36,568.44 943.32,533.76 946.08,532.32 948.479,530.52 950.64,528.48 952.439,526.081 954,523.44 955.08,520.56 955.68,517.68
	955.92,514.56 955.8,511.56 954.479,506.28 952.08,496.56 990,487.56 911.52,172.32 863.52,172.32 863.52,148.44 755.521,148.439
	755.521,134.4 627,134.4 627.001,149.04 582.6,149.04 582.66,134.4 " className="map-outline"></polygon>
            <use href="#symbol-exit" transform="scale(0.5) translate(1150,950)"></use>
            <rect className="map-bathroom" x="406.2" y="565.44" width="35.521" height="16.92"></rect>
            <rect className="map-bathroom" x="476.4" y="501.24" width="20.1" height="39.601"></rect>
            <rect className="map-bathroom" x="499.08" y="501.24" width="19.375" height="39.721"></rect>
            <rect className="map-bathroom" x="650.699" y="565.603" width="35.521" height="16.92"></rect>
            <rect className="map-bathroom" x="818.4" y="272.88" width="43.319" height="17.34"></rect>
            <rect className="map-bathroom" x="818.4" y="242.814" width="43.199" height="16.386"></rect>
            <rect className="map-space" x="672.221" y="664.141" width="19.32" height="15.72"></rect>
            <rect className="map-space" x="649.609" y="498.719" width="19.842" height="40.2"></rect>
            <rect className="map-space" x="671.196" y="498.719" width="19.842" height="30.96"></rect>
            <rect className="map-space" x="692.783" y="498.719" width="18.992" height="31.079"></rect>
            <polygon className="map-space"
                     points="735.84,539.76 713.52,539.76 713.52,498.96 731.4,498.96 731.4,502.319 735.84,502.32"></polygon>
            <polygon className="map-space" points="886.2,540.121 886.2,520.8 928.68,520.8 928.68,498.694 952.606,498.693 954.479,506.28
	955.8,511.56 955.92,514.56 955.68,517.68 955.08,520.56 954,523.44 952.439,526.081 950.64,528.48 948.479,530.52 946.08,532.32
	943.32,533.76 928.84,540.121 "></polygon>
            <polygon className="map-space"
                     points="945.479,476.566 928.68,476.566 928.68,496.966 950.4,496.966"></polygon>
            <polygon className="map-space"
                     points="945,474.84 928.68,474.84 928.68,468.121 943.32,468.121"></polygon>
            <rect className="map-space" x="886.2" y="468.121" width="40.8" height="51"></rect>
            <rect className="map-space" x="777.72" y="436.92" width="85.8" height="59.279"></rect>
            <rect className="map-space" x="734.76" y="436.92" width="40.32" height="19.02"></rect>
            <rect className="map-space" x="734.52" y="458.73" width="33.12" height="18.12"></rect>
            <polygon className="map-space" points="774.84,479.64 734.88,479.64 734.88,495.72 737.641,495.72 737.641,498.96 761.28,498.96
	761.28,495.72 774.84,495.72"></polygon>
            <polygon className="map-space"
                     points="939.345,453.121 886.2,453.121 886.2,415.68 930.273,415.68"></polygon>
            <rect className="map-space" x="865.98" y="416.16" width="18.239" height="19.08"></rect>
            <rect className="map-bathroom" x="721.68" y="245.64" width="35.521" height="19.8"></rect>
            <rect className="map-bathroom" x="442.56" y="297.36" width="12.12" height="12.12"></rect>
            <rect className="map-bathroom" x="429.72" y="297.36" width="12.12" height="12.12"></rect>
            <rect className="map-bathroom" x="393.24" y="290.534" width="35.521" height="19.185"></rect>
            <rect className="map-bathroom" x="393.24" y="271.26" width="35.521" height="16.62"></rect>
            <rect className="map-space" x="734.52" y="416.52" width="129.48" height="18.12"></rect>
            <polygon className="map-space" points="803.641,306.12 803.641,292.124 777.72,292.124 777.72,331.56 734.939,331.56 734.939,414
	861.72,414 861.72,306.12"></polygon>
            <polyline className="map-space" points="649.56,229.08 649.56,149.16 692.88,149.16 692.88,134.4 755.521,134.4 755.521,148.439
	863.52,148.44 863.52,228.96"></polyline>
            <rect className="map-space" x="714.523" y="292.691" width="18.797" height="18.109"></rect>
            <polygon className="map-space"
                     points="718.8,266.891 710.501,267 693.72,267 693.72,310.92 712.8,310.92 712.8,291 718.8,291"></polygon>
            <rect className="map-space" x="671.939" y="266.88" width="19.439" height="44.09"></rect>
            <rect className="map-space" x="650.64" y="266.88" width="18.96" height="44.04"></rect>
            <polygon className="map-space" points="627.001,149.04 582.6,149.04 582.66,134.4 520.679,134.4 520.679,149.16 497.28,149.16
	497.155,228.96 626.875,228.96"></polygon>
            <polygon className="map-space"
                     points="393.052,230.159 393.052,164.199 476.16,164.16 476.16,230.159"></polygon>
            <rect className="map-space" x="818.4" y="230.377" width="43.319" height="11.003"></rect>
            /*aule e lab*/
            <polygon className="map-space" points="295.912,619.441 295.912,615.361 276.592,615.361 276.592,619.441 263.88,619.441 263.88,679.861
	306.352,679.861 306.352,619.441"></polygon>
            <polygon className="map-space" points="338.396,619.441 338.396,615.361 319.075,615.361 319.075,619.441 308.155,619.441 308.155,679.861
	348.836,679.861 348.836,619.441"></polygon>
            <polygon className="map-space" points="380.887,608.101 380.887,604.021 361.567,604.021 361.567,608.101 350.647,608.101 350.647,679.861
	391.327,679.861 391.327,608.101"></polygon>
            <polygon className="map-space" points="423.369,608.101 423.369,604.021 404.048,604.021 404.048,608.101 393.128,608.101 393.128,679.861
	433.809,679.861 433.809,608.101"></polygon>
            <polygon className="map-space" points="465.85,608.101 465.85,604.021 446.529,604.021 446.529,608.101 435.609,608.101 435.609,679.861
	476.29,679.861 476.29,608.101"></polygon>
            <polygon className="map-space" points="508.33,608.101 508.33,604.021 489.01,604.021 489.01,608.101 478.09,608.101 478.09,679.861
	518.771,679.861 518.771,608.101"></polygon>
            <polygon className="map-space" points="593.173,608.101 593.173,601.141 575.134,601.141 575.134,604.021 531.974,604.021 531.974,608.101
	520.574,608.101 520.574,679.861 603.375,679.861 603.375,608.101"></polygon>
            <polygon className="map-space" points="618.613,603.883 618.613,607.861 607.094,607.861 607.094,679.861 669.734,679.861 669.734,603.883
	"></polygon>
            <rect className="map-space" x="763.92" y="501.24"
                  width="97.08" height="121.681"></rect>
            <polygon className="map-space" points="263.88,498.719 263.88,563.16 277.68,563.16 277.68,571.68 337.32,571.68 337.32,567.121
	347.76,567.121 347.76,498.719"></polygon>
            <polygon className="map-space"
                     points="350.52,498.719 350.52,567.42 361.08,567.42 361.08,571.68 391.245,571.68 391.245,498.719"></polygon>
            <rect className="map-space" x="412.44" y="498.719"
                  width="44.16" height="40.681"></rect>
            <polygon className="map-space" points="603.96,498.719 520.98,498.719 520.98,572.88 531.84,572.88 531.84,576.48 594.48,576.48
	594.48,572.88 603.96,572.88"></polygon>
            <polygon className="map-space"
                     points="607.561,498.719 607.561,572.64 618.12,572.64 618.12,576 647.864,576 647.864,498.719"></polygon>
            <polygon className="map-space"
                     points="314.441,257.16 314.441,252.96 266.562,252.96 266.562,331.2 326.142,331.2 326.142,257.16"></polygon>
            <polygon className="map-space"
                     points="376.8,257.16 376.8,252.96 328.92,252.96 328.92,331.2 388.5,331.2 388.5,257.16"></polygon>
            <polygon className="map-space"
                     points="560.335,310.92 560.335,256.68 547.08,256.68 547.08,252.96 492.24,252.96 492.24,256.68 476.52,256.68 476.52,310.92  "></polygon>
            <polygon className="map-space"
                     points="631.68,256.68 631.68,252.96 577.32,252.96 577.32,256.68 563.695,256.68 563.695,310.92  645.84,310.92   645.84,256.68 "></polygon>
            <polygon className="map-space"
                     points="762.24,639.72 762.24,663.6 757.439,663.6 757.439,680.76 818.88,680.76 818.88,639.72"></polygon>
            <polygon className="map-space"
                     points="393.052,150.959 266.578,150.96 266.578,228.96 377.4,228.959 377.399,223.92 393.052,223.92"></polygon>
            <polygon className="map-space" points="971.671,413.936 911.52,172.32 865.219,172.32 865.219,290.16 875.28,290.28 875.279,356.89
	865,356.89 865,414 931.92,414 934.2,423.24"></polygon>
            <use href="#symbol-bathroomM" transform="translate(649.5,605) scale(0.047) rotate(-90)"></use>
            <use href="#symbol-bathroomW" transform="translate(721, 264.5) scale(0.045) rotate(-90)"></use>
            <use href="#symbol-bathroomW" transform="translate(405, 582) rotate(-90) scale(0.045)"></use>
            <use href="#symbol-bathroomA" transform="translate(482, 543)  scale(0.037) rotate(-90)"></use>
            <use href="#symbol-bathroomA" transform="translate(823, 288.5) scale(0.04) rotate(-90)"></use>
            <use href="#symbol-bathroomA" transform="scale(0.05) translate(7900,5400)"></use>
          </g>
          <g id="mapFloor2" visibility={this.props.floor === 2 ? 'visible' : 'hidden'}>
            <path d="M881.4,603.48l77.64-34.08l4.68-2.279l4.561-2.881l4.319-3.119l3.96-3.601l3.601-3.84l3.359-4.2l2.881-4.439
	l2.52-4.681l2.16-4.92l1.68-5.04l1.2-5.16l0.72-5.279l0.24-5.28l-0.12-5.4L994.2,504l-1.2-5.16l-3-11.28l-78.48-315.239h-48v-23.88
	l-108-0.001l0.121-14.039H627l0.001,14.64H582.6l0.06-14.64l-277.62-0.001v-2.159h-36l-3.84,0.24l-3.84,0.6l-3.6,1.2l-3.48,1.56
	l-3.36,1.92l-3,2.4l-2.64,2.76l-2.4,3l-2.04,3.24l-1.56,3.48l-1.08,3.72l-0.72,3.72l-0.24,3.84v58.56h29.338l0,109.146l445.501,0
	V498.72h-448.2v181.141l558.72,0.001v-53.581h41.761v-22.802L881.4,603.48z" className="map-outline"></path>
            <use href="#symbol-exit" transform="scale(0.5)rotate(-90) translate(-1100,1350)"></use>
            <rect className="map-space" x="500.543" y="655.465" width="17.399" height="24.395"></rect>
            <rect className="map-bathroom" x="651.061" y="565.333" width="49.199" height="17.253"></rect>
            <rect className="map-bathroom" x="498.582" y="529.2" width="10.56" height="11.46"></rect>
            <rect className="map-bathroom" x="486.96" y="529.2" width="10.56" height="11.46"></rect>
            <polygon className="map-bathroom"
                     points="499.607,500.34 518.507,500.34 518.507,541.909 510.396,541.909 510.396,528.121 499.607,528.121   "></polygon>
            <polygon className="map-bathroom"
                     points="496.68,500.34 477.78,500.34 477.78,541.909 485.891,541.909 485.891,528.121 496.68,528.121 "></polygon>
            <rect className="map-bathroom" x="406.021" y="565.676" width="35.52" height="17.253"></rect>
            <polygon className="map-space"
                     points="423.747,600.6 393.48,600.6 393.48,679.86 433.44,679.86 433.44,606.9 423.747,606.9 "></polygon>
            <rect className="map-space" x="671.76" y="660" width="20.521" height="19.86"></rect>
            <rect className="map-space" x="671.34" y="640.021" width="20.881" height="17.253"></rect>
            <polygon className="map-space"
                     points="609,500.64 609,572.28 620.161,572.28 620.161,578.88 648.48,578.88 648.48,572.28 648.48,568.38   648.48,500.64"></polygon>
            <rect className="map-space" x="266.578" y="192.6" width="39.422" height="39"></rect>
            <rect className="map-space" x="266.52" y="173.041" width="39.48" height="17.88"></rect>
            <rect className="map-bathroom" x="721.879" y="248.28" width="35.52" height="17.253"></rect>
            <rect className="map-bathroom" x="266.52" y="164.43" width="24.12" height="7.08"></rect>
            <rect className="map-space" x="821.88" y="148.32" width="41.64" height="21"></rect>
            <rect className="map-space" x="832.32" y="171" width="31.199" height="19.56"></rect>
            <rect className="map-space" x="832.32" y="192.72" width="31.199" height="35.88"></rect>
            <rect className="map-space" x="825.12" y="250.8" width="14.16" height="37.2"></rect>
            <rect className="map-space" x="841.92" y="250.8" width="19.44" height="37.2"></rect>
            <rect className="map-space" x="694.363" y="257.04" width="24.96" height="31.08"></rect>
            <rect className="map-bathroom" x="393.6" y="272.04" width="35.52" height="16.187"></rect>
            <rect className="map-bathroom" x="393.6" y="290.399" width="35.52" height="18.52"></rect>
            <rect className="map-bathroom" x="430.2" y="297.24" width="11.76" height="11.88"></rect>
            <rect className="map-bathroom" x="443.28" y="297.24" width="11.4" height="11.88"></rect>
            <polygon className="map-space"
                     points="799.8,311.64 735.72,311.64 735.72,456.6 776.28,456.6 776.28,370.2 799.8,370.2 "></polygon>
            <rect className="map-space" x="778.86" y="373.44" width="20.939" height="20.28"></rect>
            <rect className="map-space" x="778.98" y="395.52" width="20.819" height="19.02"></rect>
            <rect className="map-bathroom" x="779.04" y="416.16" width="20.76" height="13.56"></rect>
            <rect className="map-bathroom" x="779.04" y="431.88" width="20.52" height="12.84"></rect>
            <rect className="map-bathroom" x="779.04" y="447.24" width="7.92" height="11.04"></rect>
            <rect className="map-bathroom" x="787.68" y="447.24" width="12.12" height="10.92"></rect>
            <rect className="map-space" x="764.16" y="499.56" width="12.54" height="19.92"></rect>
            <rect className="map-space" x="777.92" y="507.24" width="27" height="12.24"></rect>
            <rect className="map-space" x="806.14" y="499.56" width="12.12" height="19.92"></rect>
            <rect className="map-space" x="819.48" y="507.24" width="12.12" height="12.24"></rect>
            <rect className="map-space" x="848.16" y="499.56" width="13.08" height="19.92"></rect>
            <polygon className="map-terrace"
                     points="994.8,509.3 994.2,504 993,498.8 990,487.6 911.5,172.3 864.8,172.3 864.8,603.5 881.4,603.5     959,569.4 963.7,567.1 968.3,564.2 972.6,561.1 976.6,557.5 980.2,553.7 983.5,549.5 986.4,545 988.9,540.4 991.1,535.4     992.8,530.4 994,525.2 994.7,520 994.9,514.7   "></polygon>
            <polygon className="map-terrace"
                     points="454.8,288.3 454.8,309.2 390.3,309.2 390.3,331.7 719.3,331.7 719.3,310.7 719.3,309.2 719.3,288.3       "></polygon>
            <polygon className="map-terrace"
                     points="755.500 148.400, 755.600 134.400, 627.000 134.400, 627.000 149.000, 582.600 149.000, 582.700 134.400, 305.000 134.400, 305.000 132.200, 269.000 132.200, 265.200 132.400, 261.400 133.000, 257.800 134.200, 254.300 135.800, 251.000 137.700, 248.000 140.100, 245.300 142.900, 242.900 145.900, 240.900 149.100, 239.300 152.600, 238.300 156.300, 237.500 160.000, 237.300 163.800, 237.300 222.400, 266.600 222.400, 266.600 164.400, 270.000 156.400, 285.000 149.900, 390.700 149.900, 390.700 164.900, 821.900 164.900, 821.900 148.500, 755.500 148.400"></polygon>
            <polygon className="map-terrace" points="650.8,498.9 650.8,542.2 712,542.2 712,498.9"></polygon>
            <rect className="map-terrace" x="263.9" y="498.7" width="43.9" height="181.1"></rect>
            /*aule e lab*/
            <polygon className="map-space"
                     points="380.64,619.44 380.64,612.96 322.08,612.96 322.08,619.44 307.92,619.44 307.92,679.621   391.08,679.621 391.08,619.44 "></polygon>
            <polygon className="map-space"
                     points="518.662,606.72 508.41,606.72 508.41,600.6 494.372,600.6 494.372,602.76 445.89,602.76   445.89,606.72 435.571,606.72 435.571,679.621 498.911,679.621 498.911,653.874 518.662,653.874 "></polygon>
            <polygon className="map-space"
                     points="593.52,606.72 593.52,600.6 576.48,600.6 576.48,603 531,603 531,606.72 520.92,606.72   520.92,680.339 603.48,680.339 603.48,606.72 "></polygon>
            <rect className="map-space" x="764.16" y="520.687" width="97.08" height="98.873"></rect>
            <polygon className="map-space"
                     points=" 307.74023,500.75977 307.74023,560.40039 343.85156,560.40039 343.85156,560.82031 321.7207,560.82031 321.7207,575.51953 380.88086,575.51953 380.88086,560.82031 354.25586,560.82031 354.25586,560.40039 391.32031,560.40039 391.32031,500.75977 307.74023,500.75977"></polygon>
            <polygon className="map-space"
                     points="603.84,500.64 521.4,500.64 521.4,572.76 532.02,572.76 532.02,575.64 576,575.64 576,579.36   593.52,579.36 593.52,572.76 603.84,572.76 "></polygon>
            <rect className="map-space" x="266.579" y="269.04" width="39.062" height="62.586"></rect>
            <polygon className="map-space"
                     points="337.502,256.56 337.502,254.28 318.663,254.28 318.663,256.56 308.462,256.56 308.462,331.626   347.943,331.626 347.943,256.56 "></polygon>
            <polygon className="map-space"
                     points="379.8,256.56 379.8,254.28 360.96,254.28 360.96,256.56 350.76,256.56 350.76,331.626   390.24,331.626 390.24,256.56 "></polygon>
            <polygon className="map-space"
                     points="489.182,250.92 489.182,257.04 478.394,257.04 478.394,288.12 518.94,288.12 518.94,250.92 "></polygon>
            <polygon className="map-space"
                     points="550.762,250.92 550.762,257.04 561.549,257.04 561.549,288.12 521.002,288.12 521.002,250.92 "></polygon>
            <polygon className="map-space"
                     points="574.405,250.92 574.405,257.04 563.617,257.04 563.617,288.12 604.165,288.12 604.165,250.92 "></polygon>
            <polygon className="map-space"
                     points="635.992,250.92 635.992,257.04 646.781,257.04 646.781,288.12 606.227,288.12 606.227,250.92 "></polygon>
            <polygon className="map-space"
                     points="662.76,250.92 662.76,257.04 651.12,257.04 651.12,288.12 692.52,288.12 692.52,250.92 "></polygon>
            <polygon className="map-space"
                     points="476.029,164.88 393.349,164.88 393.349,222.36 410.749,222.36 410.749,227.4 466.069,227.4   466.069,222.36 476.029,222.36 "></polygon>
            <polygon className="map-space"
                     points="561.458,164.88 478.778,164.88 478.778,222.36 489.658,222.36 489.658,227.4 550.647,227.4   550.647,222.36 561.458,222.36 "></polygon>
            <polygon className="map-space"
                     points="646.891,164.88 564.203,164.88 564.203,222.36 575.083,222.36 575.083,227.4 636.077,227.4   636.077,222.36 646.891,222.36 "></polygon>
            <polygon className="map-space"
                     points="733.642,164.88 650.949,164.88 650.949,222.36 661.83,222.36 661.83,227.4 722.828,227.4   722.828,222.36 733.642,222.36 "></polygon>
            <polygon className="map-space"
                     points="817.838,164.88 736.845,164.88 736.845,222.36 746.876,222.36 746.876,227.4 807.874,227.4   807.874,222.36 817.838,222.36 "></polygon>
            <polygon className="map-space"
                     points="693,606.72 680.76,606.72 680.76,600.6 666.72,600.6 666.72,602.76 619.08,602.76 619.08,606.72   608.76,606.72 608.76,679.621 669.56,679.621 669.56,638.28 693,638.28 "></polygon>
            <polygon className="map-space"
                     points="761.88,626.281 761.88,619.8 752.4,619.8 752.4,616.2 721.68,616.2 721.68,613.32 707.16,613.32   707.16,619.8 694.707,619.8 694.707,679.862 822.6,679.862 822.6,626.281 "></polygon>
            <polygon className="map-space"
                     points=" 393.92773,500.45703 393.92773,525.28125 393.83984,525.28125 393.83984,539.1582 414.32227,539.1582 414.32227,539.13477 447.44922,539.13477 447.44922,539.12891 465.98828,539.12891 465.98828,535.78125 475.76953,535.78125 475.76953,517.52148 475.70508,517.52148 475.70508,500.45703 455.88086,500.45703 454.66992,500.45703 433.28906,500.45703 432.42578,500.45703 393.92773,500.45703"></polygon>
            <polygon className="map-space"
                     points=" 284.88086,149.88086 284.88086,162.90039 291.83984,162.90039 291.83984,171.35938 307.61914,171.35938 307.61914,229.43945 321.35938,229.43945 321.35938,222.35938 336.59961,222.35938 336.59961,229.43945 349.43945,229.43945 369.7207,229.43945 369.7207,224.49805 389.2793,224.49805 389.2793,149.88086 369.7207,149.88086 362.64062,149.88086 350.75977,149.88086 349.43945,149.88086 284.88086,149.88086"></polygon>
            <use href="#symbol-bathroomM" transform="scale(0.05)translate(13100,12150)rotate(-90)"></use>
            <use href="#symbol-bathroomW" transform="translate(405, 582) rotate(-90) scale(0.045) "></use>
            <use href="#symbol-bathroomW" transform="translate(721, 264.5) scale(0.045) rotate(-90)"></use>
            <use href="#symbol-bathroomA" transform="translate(482, 543)  scale(0.037) rotate(-90)"></use>
            <use href="#symbol-bathroomA" transform="translate(777, 454) scale(0.03) rotate(-90)"></use>
            <use href="#symbol-bathroomA" transform="scale(0.05) translate(7900,5400)"></use>
          </g>
          /*elevator n stairs*/
          <g>
            <use href="#symbol-elevator" transform="scale(0.5) translate(900,90)"></use>
            <use href="#symbol-elevator" transform="scale(0.5) translate(1410,90)"></use>
            <use href="#symbol-elevator" transform="scale(0.5) translate(890,-500)"></use>
            <use href="#symbol-elevator" transform="scale(0.5) translate(1530,-480)"></use>
            <rect className="map-stairs" x="398.944" y="248.04" width="30.613" height="21.12"></rect>
            <rect className="map-stairs" x="405.6" y="541.799" width="34.014" height="21.12"></rect>
            <rect className="map-stairs" x="650.613" y="544.679" width="34.014" height="20.12"></rect>
            <rect className="map-stairs" x="722.036" y="268.08" width="34.014" height="21.12"></rect>
          </g>
        </g>
      </svg>
    );
  }

}