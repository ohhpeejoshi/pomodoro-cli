import {intro, outro, text, spinner} from '@clack/prompts'
import {setTimeout} from 'timers/promises'

async function main() {
    intro('🍅 Welcome to the Pomodoro Timer CLI');

    const workDuration = await text({
        message: 'Enter work duration in minutes:',
        placeholder:'25',
        validate(value){
            if(isNaN(value) || value <= 0) return '⚠️ Please enter a valid duration';
        }
    });

    const breakDuration = await text({
        message: 'Enter break duration in minutes:',
        placeholder:'5',
        validate(time){
            if(isNaN(time) || time <= 0) return '⚠️ Please enter a valid duration';
        }
    })

    const cycles = await text({
        message:'Enter number of cycles:',
        placeholder:'4',
        validate(time){
            if(isNaN(time) || time <= 0) return '⚠️ Please enter a valid number';
        }
    })


    outro('All pomodoro cycles complete! Goodbye 👋')

    for(let i = 0; i < cycles; i++) {
        console.log(`\nCycle ${i+1} of ${cycles}`)
        await startTimer(workDuration, 'Work')
        await startTimer(breakDuration, 'Break')
    }
}


async function startTimer(duration, type) {
    const durationInMs = duration * 60 * 1000;
    const endTime = Date.now() + durationInMs;
    const timerSpinner = spinner();
    timerSpinner.start(`${type} timer started for ${duration} minutes...`);
  
    while (Date.now() < endTime) {
      const remainingTime = Math.max(0, endTime - Date.now());
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      timerSpinner.message(`${type} timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} remaining`);
      await setTimeout(1000);
    }
  
    timerSpinner.stop(`${type} timer ended. Time for ${type === 'Work' ? 'a break' : 'work'}!`);
}



main().catch(console.error)