
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_org_role(uuid, public.app_role[]) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_org_member(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.create_organization(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_org_role(uuid, public.app_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_org_member(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_organization(text, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.seed_demo_data(_org UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $fn$
DECLARE
  _uid UUID := auth.uid();
  _boys UUID; _girls UUID; _common UUID;
  _router UUID;
  _sp_basic UUID; _sp_std UUID; _sp_prem UUID;
  _p1h UUID; _p1d UUID; _p3d UUID; _p7d UUID; _p30d UUID;
  _ap RECORD;
  _cust UUID;
  _i INT;
  _names TEXT[] := ARRAY['Aisha Nakato','Brian Okello','Catherine Nabirye','David Mugisha','Esther Auma','Frank Ssebugwawo','Grace Atim','Henry Kato','Irene Nassuna','Joseph Wanyama','Kevin Tumwine','Lydia Akello'];
  _pkgs UUID[];
  _pkg UUID;
  _price NUMERIC;
  _code TEXT;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF NOT public.has_org_role(_org, ARRAY['org_owner']::public.app_role[]) THEN
    RAISE EXCEPTION 'Only the business owner can load sample data';
  END IF;
  IF EXISTS (SELECT 1 FROM public.locations WHERE organization_id = _org AND is_demo) THEN
    RETURN;
  END IF;

  INSERT INTO public.locations (organization_id, name, type, address, is_demo) VALUES
    (_org, 'Boys Hostel', 'hostel', 'Block A', true) RETURNING id INTO _boys;
  INSERT INTO public.locations (organization_id, name, type, address, is_demo) VALUES
    (_org, 'Girls Hostel', 'hostel', 'Block B', true) RETURNING id INTO _girls;
  INSERT INTO public.locations (organization_id, name, type, address, is_demo) VALUES
    (_org, 'Common Area', 'public_hotspot', 'Dining hall', true) RETURNING id INTO _common;

  INSERT INTO public.speed_profiles (organization_id, name, download_kbps, upload_kbps, is_demo) VALUES
    (_org, 'Basic', 5120, 2048, true) RETURNING id INTO _sp_basic;
  INSERT INTO public.speed_profiles (organization_id, name, download_kbps, upload_kbps, is_demo) VALUES
    (_org, 'Standard', 10240, 5120, true) RETURNING id INTO _sp_std;
  INSERT INTO public.speed_profiles (organization_id, name, download_kbps, upload_kbps, is_demo) VALUES
    (_org, 'Premium', 20480, 10240, true) RETURNING id INTO _sp_prem;

  INSERT INTO public.routers (organization_id, location_id, name, ip_address, api_port, username, connection_method, routeros_version, status, last_seen, cpu_load, memory_usage_pct, uptime_seconds, is_demo)
  VALUES (_org, _common, 'BETHEL-MIKROTIK-01', '192.168.88.1', 8728, 'netbill-api', 'api', '7.14.3', 'online', now(), 14, 38, 864000, true)
  RETURNING id INTO _router;

  INSERT INTO public.access_points (organization_id, location_id, router_id, name, mac_address, ip_address, model, manufacturer, group_name, status, connected_users, signal_dbm, last_seen, is_demo) VALUES
    (_org, _boys,   _router, 'BETHEL-AP-01', 'D4:CA:6D:11:01:01', '192.168.88.11', 'cAP ac', 'MikroTik', 'Boys Hostel',  'online', 23, -52, now(), true),
    (_org, _boys,   _router, 'BETHEL-AP-02', 'D4:CA:6D:11:01:02', '192.168.88.12', 'cAP ac', 'MikroTik', 'Boys Hostel',  'online', 17, -61, now(), true),
    (_org, _girls,  _router, 'BETHEL-AP-03', 'D4:CA:6D:11:01:03', '192.168.88.13', 'cAP ac', 'MikroTik', 'Girls Hostel', 'offline', 0, NULL, now() - interval '12 minutes', true),
    (_org, _common, _router, 'BETHEL-AP-04', 'D4:CA:6D:11:01:04', '192.168.88.14', 'hAP ax2', 'MikroTik', 'Common Area', 'online', 31, -48, now(), true);

  INSERT INTO public.packages (organization_id, name, description, price, duration_minutes, data_limit_mb, speed_profile_id, device_limit, is_demo) VALUES
    (_org, '1 Hour',  'Quick browsing session', 1000, 60, 1024, _sp_basic, 1, true) RETURNING id INTO _p1h;
  INSERT INTO public.packages (organization_id, name, description, price, duration_minutes, data_limit_mb, speed_profile_id, device_limit, is_demo) VALUES
    (_org, '1 Day', 'Full day access', 2000, 1440, 3072, _sp_basic, 1, true) RETURNING id INTO _p1d;
  INSERT INTO public.packages (organization_id, name, description, price, duration_minutes, data_limit_mb, speed_profile_id, device_limit, is_demo) VALUES
    (_org, '3 Days', 'Weekend bundle', 5000, 4320, 8192, _sp_std, 2, true) RETURNING id INTO _p3d;
  INSERT INTO public.packages (organization_id, name, description, price, duration_minutes, data_limit_mb, speed_profile_id, device_limit, is_demo) VALUES
    (_org, '7 Days', 'Weekly bundle', 10000, 10080, 20480, _sp_std, 2, true) RETURNING id INTO _p7d;
  INSERT INTO public.packages (organization_id, name, description, price, duration_minutes, data_limit_mb, speed_profile_id, device_limit, is_demo) VALUES
    (_org, '30 Days', 'Monthly bundle', 30000, 43200, 102400, _sp_prem, 3, true) RETURNING id INTO _p30d;

  _pkgs := ARRAY[_p1h, _p1d, _p3d, _p7d, _p30d];

  FOR _i IN 1..array_length(_names, 1) LOOP
    _pkg := _pkgs[1 + (_i % 5)];
    SELECT price INTO _price FROM public.packages WHERE id = _pkg;

    INSERT INTO public.customers (organization_id, location_id, full_name, phone, username, mac_address, ip_address, package_id, status, expires_at, total_spent, total_data_mb, last_login_at, is_demo)
    VALUES (
      _org,
      CASE WHEN _i % 3 = 0 THEN _common WHEN _i % 3 = 1 THEN _boys ELSE _girls END,
      _names[_i],
      '+25677' || lpad((100000 + _i * 4321)::text, 6, '0'),
      lower(split_part(_names[_i], ' ', 1)) || _i,
      'AA:BB:CC:' || lpad(to_hex(_i), 2, '0') || ':11:22',
      '10.5.50.' || (10 + _i),
      _pkg,
      CASE WHEN _i % 7 = 0 THEN 'expired' ELSE 'active' END,
      now() + ((_i % 9) || ' days')::interval,
      _price * (1 + (_i % 4)),
      120.5 * _i,
      now() - ((_i * 37) || ' minutes')::interval,
      true
    ) RETURNING id INTO _cust;

    INSERT INTO public.customer_devices (organization_id, customer_id, mac_address, name, last_seen, is_demo)
    VALUES (_org, _cust, 'AA:BB:CC:' || lpad(to_hex(_i), 2, '0') || ':11:22', 'Phone', now() - ((_i * 11) || ' minutes')::interval, true);

    INSERT INTO public.payments (organization_id, customer_id, package_id, router_id, reference, amount, method, gateway, phone, status, paid_at, created_at, is_demo)
    VALUES (
      _org, _cust, _pkg, _router,
      'DEMO-' || lpad(_i::text, 5, '0'),
      _price,
      'mobile_money',
      CASE WHEN _i % 2 = 0 THEN 'mtn_momo' ELSE 'airtel_money' END,
      '+25677' || lpad((100000 + _i * 4321)::text, 6, '0'),
      CASE WHEN _i % 9 = 0 THEN 'failed' WHEN _i % 11 = 0 THEN 'pending' ELSE 'successful' END,
      now() - ((_i * 6) || ' hours')::interval,
      now() - ((_i * 6) || ' hours')::interval,
      true
    );

    INSERT INTO public.sessions (organization_id, customer_id, router_id, package_id, username, mac_address, ip_address, started_at, ended_at, upload_mb, download_mb, status, is_demo)
    VALUES (
      _org, _cust, _router, _pkg,
      lower(split_part(_names[_i], ' ', 1)) || _i,
      'AA:BB:CC:' || lpad(to_hex(_i), 2, '0') || ':11:22',
      '10.5.50.' || (10 + _i),
      now() - ((_i * 40) || ' minutes')::interval,
      CASE WHEN _i % 3 = 0 THEN now() - ((_i * 9) || ' minutes')::interval ELSE NULL END,
      15.2 * _i, 88.4 * _i,
      CASE WHEN _i % 3 = 0 THEN 'closed' ELSE 'active' END,
      true
    );
  END LOOP;

  FOR _i IN 1..40 LOOP
    _pkg := _pkgs[1 + (_i % 5)];
    SELECT price INTO _price FROM public.packages WHERE id = _pkg;
    _code := 'BTH-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
    INSERT INTO public.vouchers (organization_id, code, package_id, price, status, router_id, location_id, expires_at, activated_at, is_demo)
    VALUES (
      _org, _code, _pkg, _price,
      CASE WHEN _i % 5 = 0 THEN 'used' WHEN _i % 7 = 0 THEN 'expired' WHEN _i % 4 = 0 THEN 'active' ELSE 'available' END,
      _router, _common,
      now() + ((_i % 30) || ' days')::interval,
      CASE WHEN _i % 4 = 0 THEN now() - ((_i || ' hours')::interval) ELSE NULL END,
      true
    );
  END LOOP;

  INSERT INTO public.agents (organization_id, name, phone, commission_rate, balance, is_demo) VALUES
    (_org, 'Julius Paul Kabi', '+256770000001', 10, 45000, true),
    (_org, 'Sarah Nambooze', '+256770000002', 12, 18000, true);

  INSERT INTO public.audit_logs (organization_id, actor_id, action, entity_type, entity_id, result, details)
  VALUES (_org, _uid, 'demo_data.loaded', 'organization', _org::text, 'success', jsonb_build_object('label', 'demo'));
END; $fn$;

REVOKE ALL ON FUNCTION public.seed_demo_data(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.seed_demo_data(uuid) TO authenticated;
