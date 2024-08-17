const  message = [
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824290839614980000,
        "message_idstr": "1824290839614980096",
        "message_seq": 1675,
        "client_msg_no": "3e3a47c65643149deffb5bd8d24cff143",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723779804,
        "payload": {
            "content": " ln -s /etc/init.d/dbora /etc/rc.d/rc0.d/K01dbora \n ln -s /etc/init.d/dbora /etc/rc.d/rc3.d/S99dbora \n ln -s /etc/init.d/dbora /etc/rc.d/rc5.d/S99dbora\n",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075252,
        "message_extra": {
            "message_id": 1824290839614980000,
            "message_id_str": "1824290839614980096",
            "readed_count": 1,
            "extra_version": 1075252
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824291074483421200,
        "message_idstr": "1824291074483421184",
        "message_seq": 1676,
        "client_msg_no": "5e939ea14c74175a197ae6f706b73c3f3",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723779860,
        "payload": {
            "content": ".",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075254,
        "message_extra": {
            "message_id": 1824291074483421200,
            "message_id_str": "1824291074483421184",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723779861,
            "extra_version": 1075254
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824291074483421200,
        "message_idstr": "1824291074483421185",
        "message_seq": 1677,
        "client_msg_no": "26d07ed4973a7056a99586fdba5be7893",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723779860,
        "payload": {
            "content": "1",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075253,
        "message_extra": {
            "message_id": 1824291074483421200,
            "message_id_str": "1824291074483421185",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723779861,
            "extra_version": 1075253
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824292313954779100,
        "message_idstr": "1824292313954779136",
        "message_seq": 1678,
        "client_msg_no": "7b3e4a5073d8586a75086d1668e519c63",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723780156,
        "payload": {
            "content": "begin\nsys.DBMS_RESOURCE_MANAGER.CREATE_PENDING_AREA;\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN(plan =>'IDLE_BLOCKER_PLAN', comment => 'PLAN: MAX IDLE BLOCKER TIME', sub_plan => FALSE);\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(PLAN => 'IDLE_BLOCKER_PLAN',GROUP_OR_SUBPLAN =>'OTHER_GROUPS',COMMENT => 'PLAN: MAX IDLE BLOCKER TIME',MAX_IDLE_BLOCKER_TIME => 60);\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(PLAN=> 'IDLE_BLOCKER_PLAN', GROUP_OR_SUBPLAN =>'LOW_GROUP',COMMENT => 'PLAN: MAX IDLE BLOCKER TIME',MAX_IDLE_BLOCKER_TIME => 60);\nsys.DBMS_RESOURCE_MANAGER.VALIDATE_PENDING_AREA(); sys.DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();\nend; ",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075268,
        "message_extra": {
            "message_id": 1824292313954779100,
            "message_id_str": "1824292313954779136",
            "readed_count": 1,
            "extra_version": 1075268
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824293678391230500,
        "message_idstr": "1824293678391230464",
        "message_seq": 1679,
        "client_msg_no": "8ebd0841053bc18687c31832c21321d83",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723780481,
        "payload": {
            "content": "if [ -f ~/.bashrc ]; then\n. ~/.bashrc fi\n",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075267,
        "message_extra": {
            "message_id": 1824293678391230500,
            "message_id_str": "1824293678391230464",
            "readed_count": 1,
            "extra_version": 1075267
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824321972167770000,
        "message_idstr": "1824321972167770112",
        "message_seq": 1680,
        "client_msg_no": "4d2ea89529199aa5d639818b7d616b073",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723787227,
        "payload": {
            "content": "alter system set resource_manager_plan='IDLE_BLOCKER_PLAN';",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075270,
        "message_extra": {
            "message_id": 1824321972167770000,
            "message_id_str": "1824321972167770112",
            "readed_count": 1,
            "extra_version": 1075270
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824322114337898500,
        "message_idstr": "1824322114337898496",
        "message_seq": 1681,
        "client_msg_no": "44d44ac2f2213186173fa9ccef97a4f63",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723787260,
        "payload": {
            "content": "select plan,group_or_subplan,max_idle_blocker_time from DBA_RSRC_PLAN_DIRECTIVES where plan='IDLE_BLOCKER_PLAN';",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075271,
        "message_extra": {
            "message_id": 1824322114337898500,
            "message_id_str": "1824322114337898496",
            "readed_count": 1,
            "extra_version": 1075271
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824324483377266700,
        "message_idstr": "1824324483377266688",
        "message_seq": 1682,
        "client_msg_no": "fb4c873c451a128b1ec42a510bee17523",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723787825,
        "payload": {
            "content": "ALTER SYSTEM SET resource_manager_plan='';",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075269,
        "message_extra": {
            "message_id": 1824324483377266700,
            "message_id_str": "1824324483377266688",
            "readed_count": 1,
            "extra_version": 1075269
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824325721913294800,
        "message_idstr": "1824325721913294848",
        "message_seq": 1683,
        "client_msg_no": "5fc605b6827e84a87a8d3f49fe4db7d93",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723788121,
        "payload": {
            "content": "begin\nsys.DBMS_RESOURCE_MANAGER.CLEAR_PENDING_AREA();  \nsys.DBMS_RESOURCE_MANAGER.CREATE_PENDING_AREA();\nsys.DBMS_RESOURCE_MANAGER.DELETE_PLAN ('IDLE_BLOCKER_PLAN');\nsys.DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();\nend; ",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075274,
        "message_extra": {
            "message_id": 1824325721913294800,
            "message_id_str": "1824325721913294848",
            "readed_count": 1,
            "extra_version": 1075274
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824327209309962200,
        "message_idstr": "1824327209309962240",
        "message_seq": 1684,
        "client_msg_no": "de73ce3fca5fa8983ae33671be3687763",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723788475,
        "payload": {
            "content": "begin\nsys.DBMS_RESOURCE_MANAGER.CLEAR_PENDING_AREA();  \nsys.DBMS_RESOURCE_MANAGER.CREATE_PENDING_AREA();\nsys.DBMS_RESOURCE_MANAGER.DELETE_PLAN ('IDLE_BLOCKER_PLAN');\nsys.DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();\nend; \n/",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075277,
        "message_extra": {
            "message_id": 1824327209309962200,
            "message_id_str": "1824327209309962240",
            "readed_count": 1,
            "extra_version": 1075277
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824327970077016000,
        "message_idstr": "1824327970077016064",
        "message_seq": 1685,
        "client_msg_no": "6ba9c97e784450acc4714c562fabd8033",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723788657,
        "payload": {
            "content": "begin\nsys.DBMS_RESOURCE_MANAGER.CREATE_PENDING_AREA;\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN(plan =>'IDLE_BLOCKER_PLAN', comment => 'PLAN: MAX IDLE BLOCKER TIME', sub_plan => FALSE);\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(PLAN => 'IDLE_BLOCKER_PLAN',GROUP_OR_SUBPLAN =>'OTHER_GROUPS',COMMENT => 'PLAN: MAX IDLE BLOCKER TIME',MAX_IDLE_BLOCKER_TIME => 60);\nsys.DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(PLAN=> 'IDLE_BLOCKER_PLAN', GROUP_OR_SUBPLAN =>'LOW_GROUP',COMMENT => 'PLAN: MAX IDLE BLOCKER TIME',MAX_IDLE_BLOCKER_TIME => 60);\nsys.DBMS_RESOURCE_MANAGER.VALIDATE_PENDING_AREA(); sys.DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();\nend; \n/",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075278,
        "message_extra": {
            "message_id": 1824327970077016000,
            "message_id_str": "1824327970077016064",
            "readed_count": 1,
            "extra_version": 1075278
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824333058719875000,
        "message_idstr": "1824333058719875072",
        "message_seq": 1686,
        "client_msg_no": "34e63d54473ffa93c79534f4941ff3233",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723789870,
        "payload": {
            "content": "alter database add logfile group 4 '/oradata/orcl/redo04.log' size 1024M; \nalter database add logfile group 5 '/oradata/orcl/redo05.log' size 1024M;\nalter database add logfile group 6 '/oradata/orcl/redo06.log' size 1024M;\nalter system switch logfile; \nalter system switch logfile;\nalter system switch logfile;\nalter database drop logfile group 1;\nalter database add logfile group 1 '/oradata/orcl/redo01.log' size 1024M; \nalter database drop logfile group 2;\nalter database add logfile group 2 '/oradata/orcl/redo02.log' size 1024M;\nalter database drop logfile group 3;\nalter database add logfile group 3 '/oradata/orcl/redo03.log' size 1024M;",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075279,
        "message_extra": {
            "message_id": 1824333058719875000,
            "message_id_str": "1824333058719875072",
            "readed_count": 1,
            "extra_version": 1075279
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824334157828849700,
        "message_idstr": "1824334157828849664",
        "message_seq": 1687,
        "client_msg_no": "9e5dc22c0e61e37ec75b9ed28d279b1c3",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723790132,
        "payload": {
            "content": "/opt/oracle/oradata/ORCLCDB/",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075281,
        "message_extra": {
            "message_id": 1824334157828849700,
            "message_id_str": "1824334157828849664",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723790133,
            "extra_version": 1075281
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824334157854015500,
        "message_idstr": "1824334157854015488",
        "message_seq": 1688,
        "client_msg_no": "ba3e851c981e795cf17709539c2ebc263",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723790132,
        "payload": {
            "content": "alter database add logfile group 4 '/opt/oracle/oradata/ORCLCDB/redo04.log' size 1024M; ",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075280,
        "message_extra": {
            "message_id": 1824334157854015500,
            "message_id_str": "1824334157854015488",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723790133,
            "extra_version": 1075280
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824334366478696400,
        "message_idstr": "1824334366478696448",
        "message_seq": 1689,
        "client_msg_no": "0704640547db8ad8dfc2912b028a1fde3",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723790182,
        "payload": {
            "content": "alter database add logfile group 4 '/opt/oracle/oradata/ORCLCDB/redo04.log' size 1024M; \nalter database add logfile group 5 '/opt/oracle/oradata/ORCLCDB/redo05.log' size 1024M;\nalter database add logfile group 6 '/opt/oracle/oradata/ORCLCDB/redo06.log' size 1024M;\nalter system switch logfile; \nalter system switch logfile;\nalter system switch logfile;\nalter database drop logfile group 1;\nalter database add logfile group 1 '/opt/oracle/oradata/ORCLCDB/redo01.log' size 1024M; \nalter database drop logfile group 2;\nalter database add logfile group 2 '/opt/oracle/oradata/ORCLCDB/redo02.log' size 1024M;\nalter database drop logfile group 3;\nalter database add logfile group 3 '/opt/oracle/oradata/ORCLCDB/redo03.log' size 1024M;",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075283,
        "message_extra": {
            "message_id": 1824334366478696400,
            "message_id_str": "1824334366478696448",
            "readed_count": 1,
            "extra_version": 1075283
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824445593456476200,
        "message_idstr": "1824445593456476160",
        "message_seq": 1690,
        "client_msg_no": "8164c8fc9c294477a4a6a2a3ea41aea03",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723816700,
        "payload": {
            "content": "222",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075284,
        "message_extra": {
            "message_id": 1824445593456476200,
            "message_id_str": "1824445593456476160",
            "readed_count": 1,
            "extra_version": 1075284
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824445783026434000,
        "message_idstr": "1824445783026434048",
        "message_seq": 1691,
        "client_msg_no": "36311cee89d16f31827432d33966fea93",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723816745,
        "payload": {
            "content": " unzip -q /home/oracle/LINUX.X64_193000_db_home.zip",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075285,
        "message_extra": {
            "message_id": 1824445783026434000,
            "message_id_str": "1824445783026434048",
            "readed_count": 1,
            "extra_version": 1075285
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824698838800138200,
        "message_idstr": "1824698838800138240",
        "message_seq": 1692,
        "client_msg_no": "859a3c962346742d0b1afd03ef0e9f523",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723877079,
        "payload": {
            "content": "123",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075291,
        "message_extra": {
            "message_id": 1824698838800138200,
            "message_id_str": "1824698838800138240",
            "readed_count": 1,
            "extra_version": 1075291
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824699096007442400,
        "message_idstr": "1824699096007442432",
        "message_seq": 1693,
        "client_msg_no": "b92f734f4580b74fedb799b1836341313",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723877140,
        "payload": {
            "content": "123123",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075293,
        "message_extra": {
            "message_id": 1824699096007442400,
            "message_id_str": "1824699096007442432",
            "readed_count": 1,
            "extra_version": 1075293
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717436918694000,
        "message_idstr": "1824717436918693888",
        "message_seq": 1694,
        "client_msg_no": "faa211ef90a399daaf23842ff4fe2d453",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723881513,
        "payload": {
            "content": "ff",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075292,
        "message_extra": {
            "message_id": 1824717436918694000,
            "message_id_str": "1824717436918693888",
            "readed_count": 1,
            "extra_version": 1075292
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717501301260300,
        "message_idstr": "1824717501301260288",
        "message_seq": 1695,
        "client_msg_no": "30f9340a6c6ff2daf980815693fb5dfd3",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723881528,
        "payload": {
            "content": "hello",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075290,
        "message_extra": {
            "message_id": 1824717501301260300,
            "message_id_str": "1824717501301260288",
            "readed_count": 1,
            "extra_version": 1075290
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717770533634000,
        "message_idstr": "1824717770533634048",
        "message_seq": 1696,
        "client_msg_no": "948dfc5cf12adf7c99359c6c7de3dbbf3",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881592,
        "payload": {
            "content": "你好",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075296,
        "message_extra": {
            "message_id": 1824717770533634000,
            "message_id_str": "1824717770533634048",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881625,
            "extra_version": 1075296
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717811654590500,
        "message_idstr": "1824717811654590464",
        "message_seq": 1697,
        "client_msg_no": "5f555d3fc054c5d32151a9f5685ccd423",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881602,
        "payload": {
            "content": "你好",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075295,
        "message_extra": {
            "message_id": 1824717811654590500,
            "message_id_str": "1824717811654590464",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881625,
            "extra_version": 1075295
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717839869673500,
        "message_idstr": "1824717839869673472",
        "message_seq": 1698,
        "client_msg_no": "e7c3ccdbc28ceb316a30091158b8a58c3",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881609,
        "payload": {
            "content": "xxx",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075294,
        "message_extra": {
            "message_id": 1824717839869673500,
            "message_id_str": "1824717839869673472",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881625,
            "extra_version": 1075294
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717932622512000,
        "message_idstr": "1824717932622512128",
        "message_seq": 1699,
        "client_msg_no": "28495d1377bbb8501a32cdc3fac0ecaf3",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723881631,
        "payload": {
            "content": "😜",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075298,
        "message_extra": {
            "message_id": 1824717932622512000,
            "message_id_str": "1824717932622512128",
            "readed_count": 1,
            "extra_version": 1075298
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824717959298285600,
        "message_idstr": "1824717959298285568",
        "message_seq": 1700,
        "client_msg_no": "c826e88c114f49e8e9443fe465acd3523",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723881637,
        "payload": {
            "content": "😣😴",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075299,
        "message_extra": {
            "message_id": 1824717959298285600,
            "message_id_str": "1824717959298285568",
            "readed_count": 1,
            "extra_version": 1075299
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824718077363748900,
        "message_idstr": "1824718077363748864",
        "message_seq": 1701,
        "client_msg_no": "719ee8e0489763417c7244ddc9cdfbc83",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881665,
        "payload": {
            "content": "https://web.botgate.cn/index.html",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075300,
        "message_extra": {
            "message_id": 1824718077363748900,
            "message_id_str": "1824718077363748864",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881667,
            "extra_version": 1075300
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824718167964909600,
        "message_idstr": "1824718167964909568",
        "message_seq": 1702,
        "client_msg_no": "58e0801195a9c0d77a8a88a21e9ec0203",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881687,
        "payload": {
            "content": "https://web.botgate.cn/index.html",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075304,
        "message_extra": {
            "message_id": 1824718167964909600,
            "message_id_str": "1824718167964909568",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881689,
            "extra_version": 1075304
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824718170489880600,
        "message_idstr": "1824718170489880576",
        "message_seq": 1703,
        "client_msg_no": "3e400addf2bfa6e722a2a87eb379c3e93",
        "from_uid": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_id": "5ffdd74b21774efeb79631e71919e46a",
        "channel_type": 1,
        "timestamp": 1723881688,
        "payload": {
            "content": "https://web.botgate.cn/index.html",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 1,
        "readed_count": 1,
        "extra_version": 1075303,
        "message_extra": {
            "message_id": 1824718170489880600,
            "message_id_str": "1824718170489880576",
            "readed": 1,
            "readed_count": 1,
            "readed_at": 1723881689,
            "extra_version": 1075303
        }
    },
    {
        "header": {
            "no_persist": 0,
            "red_dot": 1,
            "sync_once": 0
        },
        "setting": 128,
        "message_id": 1824718223220670500,
        "message_idstr": "1824718223220670464",
        "message_seq": 1704,
        "client_msg_no": "6b809dbb0da590288d8ad2853e1595e53",
        "from_uid": "5ffdd74b21774efeb79631e71919e46a",
        "channel_id": "f83c9d5efde54b23955b0cb70c4d6d2a",
        "channel_type": 1,
        "timestamp": 1723881700,
        "payload": {
            "content": "helxxxxx",
            "mention": {},
            "type": 1
        },
        "signal_payload": "",
        "is_deleted": 0,
        "readed": 0,
        "readed_count": 1,
        "extra_version": 1075306,
        "message_extra": {
            "message_id": 1824718223220670500,
            "message_id_str": "1824718223220670464",
            "readed_count": 1,
            "extra_version": 1075306
        }
    }
];

export default message;
