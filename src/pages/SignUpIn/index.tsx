import styles from './styles.module.less';

export default function SignUpIn() {
  return (
    <div className={styles.Login}>
      <form>
        <label>
          <input type="text" placeholder="用户名" />
        </label>
        <label>
          <input type="password" placeholder="密码" />
        </label>
        <button className="red" type="button">
          <i className="Icon ion-md-lock"></i> 登录
        </button>
        <div className="Segment">
          <button className="Unit" type="button">
            <i className="Icon ion-md-arrow-back">a</i>
          </button>
          <button className="Unit" type="button">
            <i className="Icon ion-md-bookmark">b</i>
          </button>
          <button className="Unit" type="button">
            <i className="Icon ion-md-settings">c</i>
          </button>
        </div>
      </form>
    </div>
  );
}
