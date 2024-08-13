<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    import type { AggregationType } from '../aggregate-data';
    import { goto } from '$app/navigation';

    interface TimeOption {
        label: string;
        month: number;
        aggregationType: AggregationType;
    }

    let timeOptions: TimeOption[] = [
        {
            label: '1 Month',
            month: new Date().getMonth(),
            aggregationType: 'Daily'
        },
        {
            label: '3 Months',
            month: new Date().getMonth() - 2,
            aggregationType: 'Weekly'
        },
        {
            label: '6 Months',
            month: new Date().getMonth() - 5,
            aggregationType: 'Weekly'
        }
    ];
    let selectedTimeOption = timeOptions[0];

    const dispatch = createEventDispatcher();

    function select(newOption: TimeOption) {
        selectedTimeOption = newOption;
        goto(`/progress?month=${newOption.month}`);
        dispatch('selected', {
            aggregationType: selectedTimeOption.aggregationType
        });
    }
</script>

<div class="fifi-container">
    <div class="fifi-options">
        {#each timeOptions as option}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <button
                class={selectedTimeOption.label === option.label ? 'fifi-option-selected' : ''}
                on:click={() => select(option)}>{option.label}
            </button>
        {/each}
    </div>
</div>

<style lang='scss'>
    div.fifi-container {
        display: flex;
        justify-content: center;
        margin: 80px 0;

        div.fifi-options {
            background-color: #252525;
            border-radius: 20px;
            display: inline-block;
            list-style: none;
            margin: 0 0.25em;
            padding: 0.5em 0.5em;
            white-space: nowrap;
        }


        button {
            background: transparent;
            color: white;
            border: 0;
            border-radius: 15px;
            cursor: pointer;
            font-weight: 700;
            min-width: 6.9em;
            outline: 0;
            padding: 0.50em 3.5em;

            @media screen and (max-width: 750px) {
                padding: 0.5em;
            }
        }

        button:hover {
            cursor: pointer;
        }

        button.fifi-option-selected {
            background-color: #0090E3;
        }
    }
</style>