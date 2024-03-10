<script lang='ts'>
    export let activityValue = '';
    export let activityProperty = '';
    export let percentageAchieved = 0;
    
    
    // 400px = 0%
    // 0px = 100%
    const strokeDashoffset = ((100 - percentageAchieved) / 100) * 400;

</script>

<div class="circle circle-big">
    <svg height="150" width="150" style="--stroke-dashoffset: {strokeDashoffset}">
      <circle cx="80" cy="74" r="64" class="line-shadow" stroke="#000000" stroke-width="10" fill="none"></circle>
      <circle cx="80" cy="74" r="64" class="line line-1" stroke="#00DEA3" stroke-width="10" fill="none"></circle>
    </svg>
    
    <div class="info">
        <span class="info__top">{activityValue}</span>
        <span class="info__bottom">{activityProperty}</span>
    </div>
</div>

<style lang='scss'>

    svg {
        transform: rotate(-90deg);
    }
    
    .line {
        stroke-linecap: round;
        transform-style: linear;
    }
    
    $stroke-dasharray-1: 400;
    
    .line-1 {
        stroke-dasharray: $stroke-dasharray-1;
        animation: dash-1 1s linear forwards;
    }
    
    @keyframes dash-1 {
      from { stroke-dashoffset: $stroke-dasharray-1; }
        to { stroke-dashoffset: var(--stroke-dashoffset); }
    }
    
    .circle {
        position: relative;
        margin: 0 auto;
    }
    
    .circle-big {
        width: 150px;
        height: 150px;
        margin-top: 15px;
    }
    
    .info {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        text-align: center;
        
        &__top {
            color: #000;
            font-size: 1.4em;
        }
        
        &__bottom {
            color: #648192;
            font-size: 0.8em;
            display: block;
        }
    }
    
    .line-shadow {
        stroke: rgba(0,0,0,.3);
    }
    </style>