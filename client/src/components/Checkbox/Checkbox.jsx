import styles from "./Checkbox_master.module.css"

const Checkbox = ({label="", checked=false, onChange}) => {
    return (
        <label className={`${styles.control} ${styles.control_checkbox}`}>
            {label}
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <div className={styles.control_indicator}></div>
        </label>
    )
}

export default Checkbox