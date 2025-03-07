import React, { Fragment, CSSProperties } from 'react';
import zxcvbn from 'zxcvbn';
import Item from './Item';

export interface PasswordStrengthBarProps {
  className?: string;
  style?: {};
  scoreWordClassName?: string;
  scoreWordStyle?: {};
  password: string;
  userInputs?: string[];
  barColors?: string[];
  scoreWords?: string[];
  minLength?: number;
  shortScoreWord?: string;
  onChangeScore?: (score: number) => void;
}

interface PasswordStrengthBarState {
  score: number;
}

const rootStyle: CSSProperties = {
  position: 'relative',
};

const wrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: '5px 0 0',
};

const spaceStyle: CSSProperties = {
  width: 4,
};

const descStyle: CSSProperties = {
  margin: '5px 0 0',
  color: '#898792',
  fontSize: 14,
  textAlign: 'right',
};

class PasswordStrengthBar extends React.Component<
  PasswordStrengthBarProps,
  PasswordStrengthBarState
> {
  static defaultProps = {
    className: undefined,
    style: undefined,
    scoreWordClassName: undefined,
    scoreWordStyle: undefined,
    userInputs: [],
    barColors: ['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281'],
    scoreWords: ['weak', 'weak', 'okay', 'good', 'strong'],
    minLength: 4,
    shortScoreWord: 'too short',
    onChangeScore: undefined,
  };

  state = {
    score: 0,
  };

  componentDidMount() {
    this.setScore();
  }

  componentDidUpdate(prevProps: PasswordStrengthBarProps) {
    const { password } = this.props;
    if (prevProps.password !== password) {
      this.setScore();
    }
  }

  setScore = () => {
    const { password, minLength, userInputs, onChangeScore } = this.props;
    let result = null;
    let score = 0;
    if (password.length >= minLength) {
      result = zxcvbn(password, userInputs);
      ({ score } = result);
    }
    this.setState(
      {
        score,
      },
      () => {
        if (onChangeScore) {
          onChangeScore(score);
        }
      },
    );
  };

  public render() {
    const {
      className,
      style,
      scoreWordClassName,
      scoreWordStyle,
      password,
      barColors,
      scoreWords,
      minLength,
      shortScoreWord,
    } = this.props;
    const { score } = this.state;
    let newShortScoreWord = password.length < minLength
      ? shortScoreWord
      : scoreWords[score];
      console.log({newShortScoreWord, score, minLength, shortScoreWord,passwordlength:password.length , scoreWordsSCORE: [score], scoreWords})
    return (
      <div className={className} style={{ ...rootStyle, ...style }}>
        <p>DEV!</p>
        <div style={wrapStyle}>
          {[1, 2, 3, 4].map((el: number) => {
            return (
              <Fragment key={`password-strength-bar-item-${el}`}>
                {el > 1 && <div style={spaceStyle} />}
                <Item score={score} itemNum={el} barColors={barColors} />
              </Fragment>
            );
          })}
        </div>
        <p
          className={scoreWordClassName}
          style={{ ...descStyle, ...scoreWordStyle }}
        >
          {newShortScoreWord}
        </p>
      </div>
    );
  }
}

export default PasswordStrengthBar;
