import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Questions.css'; // Import the new CSS file

export default function Questions({ no, name, qlist, Checked, setChecked, qstate, setqstate, mode }) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let strs = localStorage.getItem('Checked' + `${no}`);
    if (strs == null) return;
    let item2 = [];

    for (let i = 0; i < strs.length; i++) {
      if (strs[i] === '+') { item2.push((strs[i] + strs[i + 1] + strs[i + 2])); i += 3; }
      else if (strs[i] !== ',' && strs[i] !== '/' && strs[i] !== '"' && strs[i] !== '[' && strs[i] !== ']' && (strs[i] < 'a' || strs[i] > 'z') && strs[i] !== "\\" && strs[i] !== '+' && strs[i] !== '0') { item2.push(strs[i]); }
    }

    setChecked(item2);
    setDoneCount(item2.length);
    localStorage.setItem('Checked' + `${no}`, JSON.stringify(item2));
  }, [no, setChecked]);

  const handleMarkAsDone = (id) => {
    if (isIDChecked(id)) {
      const newList = Checked.filter((idt) => idt !== id);
      setChecked(newList);
      setDoneCount(newList.length);
      localStorage.setItem('Checked' + `${no}`, JSON.stringify(newList));
    } else {
      setChecked([...Checked, id]);
      setDoneCount(Checked.length + 1);
      localStorage.setItem('Checked' + `${no}`, JSON.stringify([...Checked, id]));
    }
  };

  const isIDChecked = (ele) => {
    return Checked && Checked.includes(ele);
  };

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h1>{doneCount}/{qlist.length} Questions Completed</h1>
      </div>
      <div className="questions-title-section flex justify-center mt-24">
        <img className="w-10 h-10" src="Sparkle.png" alt="Sparkle"></img>
        <h1 className="text-4xl mb-3">{name} Problems</h1>
      </div>
      <div className="questions-breadcrumb-section flex justify-center mt-4">
        <Link className="pr-2" to="/">Topics</Link>
        <p>/ {name}</p>
      </div>

      <div className="questions-cards-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-6">
        {
          qlist.map((ele) => (
            <div key={ele.ID} className={`questions-card ${isIDChecked(ele.ID) ? 'completed' : 'not-completed'}`}>
              <div className="questions-card-body">
                <Link className="questions-link" target="_blank" to={ele.link}>{ele.Q}</Link>
                <div className="questions-card-footer">
                  <button className="mark-done-button" onClick={() => handleMarkAsDone(ele.ID)}>
                    {isIDChecked(ele.ID) ? 'Marked as Done' : 'Mark as Done'} →
                  </button>
                </div>
              </div>
              {isIDChecked(ele.ID) ? <div className="completed-bar"></div> : <div className="not-completed-bar"></div>}
            </div>
          ))
        }
      </div>
    </div>
  );
}
