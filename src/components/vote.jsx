import React, { useEffect, useState } from 'react';
import { Icon } from 'zmp-ui';
import api from 'zmp-sdk';

const Vote = (prop) => {
    let { setTitle, title, plan, setPlan, setIsValidCheck } = prop;
    const [voteText, setVoteText] = useState('');

    useEffect(() => {
        setTitle('');
        setPlan([
            { id: null, title: '' },
            { id: null, title: '' },
        ]);
    }, []);

    const checkVote = (plan) => {
        if (plan) {
            for (let i = 0; i < plan.length; i++) {
                console.log('len', plan[i].title.length);
                console.log('-----');
                if (
                    plan[i].title.length === 0 ||
                    plan[i].title.length === undefined ||
                    (i + 1 < plan.length && plan[i].title == plan[i + 1].title)
                ) {
                    setIsValidCheck(false);
                    break;
                } else {
                    setIsValidCheck(true);
                }
            }
        }
    };
    const handleSnackbar = () => {
        api.showToast({
            message: 'Bình chọn phải có ít nhất 2 phương án',
            success: (data) => {
                // xử lý khi gọi api thành công
            },
            fail: (error) => {
                // xử lý khi gọi api thất bại
                console.log(error);
            },
        });
    };
    const handleAddPlan = () => {
        let newPlan = { id: null, title: '' };
        let listPlan = [...plan, newPlan];
        setPlan(listPlan);
        checkVote(listPlan);
    };

    const handleDeletePlan = (id) => {
        if (plan.length > 2) {
            if (plan) {
                let currPlan = plan;
                currPlan = currPlan.filter((item, index) => index !== id);
                checkVote(currPlan);
                setPlan(currPlan);
            } else {
                handleSnackbar();
            }
        } else if (plan.length <= 2) {
            handleSnackbar();
        }
    };
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1].focus();
            e.preventDefault();
        }
    };
    const handleOnChangeVote = (e, id) => {
        const limit = 120;

        setVoteText(e.target.value.slice(0, limit));
        if (voteText.length >= 119) {
            handleSnackbar();
        } else {
            setVoteText(e.target.value.slice(0, limit));
        }
        if (plan && plan.length > 0) {
            let planList = plan;
            planList[id].title = e.target.value;
            console.log(planList);
            setPlan(planList);
        }
        checkVote(plan);
    };

    return (
        <div className="vote-container">
            <textarea
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="input-vote mb-2"
                placeholder="Đặt câu hỏi bình chọn"
            ></textarea>
            <div className="plan">
                <form>
                    {plan &&
                        plan.length > 0 &&
                        plan.map((item, index) => {
                            return (
                                <>
                                    <label className="input-label">Phương án {index + 1}</label>
                                    <div className="d-flex border-bottom" key={index}>
                                        <input
                                            value={item.title}
                                            maxLength={120}
                                            onChange={(e) => handleOnChangeVote(e, index)}
                                            onKeyDown={(e) => handleEnter(e)}
                                            type="text"
                                            className="input-plan"
                                        />
                                        <span onClick={() => handleDeletePlan(index)} className="icon-close">
                                            <Icon icon="zi-close" />
                                        </span>
                                    </div>
                                </>
                            );
                        })}
                    <div onClick={() => handleAddPlan()} className="add-plan mt-3">
                        Thêm phương án
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Vote;
