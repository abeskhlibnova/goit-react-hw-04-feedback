import React from 'react';
import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import { Wrapper } from './Feedback.styled';

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const leaveFeedback = propertyName => {
    switch (propertyName) {
      case 'good':
        return setGood(prev => prev + 1);

      case 'neutral':
        return setNeutral(prev => prev + 1);

      case 'bad':
        return setBad(prev => prev + 1);

      default:
        return;
    }
  };

  const countPositiveFeedbackPercentage = property => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }
    const valuePositive = good;
    const result = (valuePositive / total) * 100;
    return Number(result.toFixed(0));
  };

  const total = countTotalFeedback();

  return (
    <Wrapper>
      <Section title="Please leave feedback">
        <FeedbackOptions
          leaveFeedback={leaveFeedback}
          keys={Object.keys({ good, neutral, bad })}
        />
      </Section>
      <Section title="Statistics">
        {!total ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercent={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Wrapper>
  );
}
